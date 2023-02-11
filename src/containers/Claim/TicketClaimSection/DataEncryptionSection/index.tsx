import { useAuth } from '@arcana/auth-react'
import React, { useEffect, useState } from 'react'
import LitJsSdk from '@lit-protocol/sdk-browser'
import If from '@/components/If'
import { ChevronRight, CircleCheckFill } from 'akar-icons'
import { QueryProps } from '../../types'
import {
  encryptRawData,
  FETCH_TREE_CID,
  getAccessControlConditions,
  getMerkleHashes,
  getRelayStatus,
  getSignature,
  hashQueryData,
  pinBlobToIPFS,
  pinDataToIPFS,
} from '../../utils'
import Spinner from '../../components/Spinner'
import { ENCRYPTION_STEPS } from './constants'
import { client } from '@/components/ApolloClient'
import { FETCH_EVENT_OWNER_QUERY } from '@/graphql/query/fetchEventOwnerAddress'
import { Blob } from 'nft.storage'
import { GELATO_API_KEY, getNetwork, SIMPLR_ADDRESS } from '@/utils/constants'
import { BigNumber, ethers } from 'ethers'
import MerkleTree from 'merkletreejs'
import contracts from '@/contracts.json'
import {
  GelatoRelay,
  SponsoredCallERC2771Request,
} from '@gelatonetwork/relay-sdk'

const DataEncryptionSection = ({
  query,
  setStep,
}: {
  query: QueryProps
  setStep: (number) => void
}) => {
  const auth = useAuth()
  const [signature, setSignature] = useState()
  const [currentStep, setCurrentStep] = useState(0)
  const [secretHash, setSecretHash] = useState(null)
  const [proofs, setProofs] = useState(null)

  useEffect(() => {
    FETCH_TREE_CID(query?.batchid).then((data) => {
      const hashCID = data.batches[0].cid
      console.log({ hashCID })
      getMerkleHashes(hashCID).then((hashes) => {
        console.log({ hashes })
        const leafs = hashes.map((entry) => ethers.utils.keccak256(entry))
        const tree = new MerkleTree(leafs, ethers.utils.keccak256, {
          sortPairs: true,
        })
        const leaf = ethers.utils.keccak256(hashQueryData(query))
        const proofs = tree.getHexProof(leaf)
        console.log({ proofs })
        setProofs(proofs)
      })
    })
  }, [])

  const handleSignature = async (e) => {
    e.preventDefault()
    setCurrentStep(ENCRYPTION_STEPS.GET_SIGNATURE)
    const signature = await getSignature(auth)
    setSignature(signature)
    setCurrentStep(ENCRYPTION_STEPS.ENCRYPTING)
  }

  useEffect(() => {
    if (currentStep === ENCRYPTION_STEPS.ENCRYPTING) {
      handleEncryptandPin()
    } else if (currentStep === ENCRYPTION_STEPS.MINT_TICKET) {
      handleTicketMinting()
    }
  }, [currentStep])

  const handleEncryptandPin = async () => {
    // Initialize Lit Protocol SDK
    const litClient = new LitJsSdk.LitNodeClient()
    await litClient.connect()

    // Fetch event owner address from Subgrqph to be used for access control condition
    const eventData = await client.query({
      query: FETCH_EVENT_OWNER_QUERY,
      variables: {
        name: query.eventname,
      },
    })
    const eventOwnerAddress = eventData.data.simplrEvents[0].owner.address

    // Define access control conditions
    const accessControlConditions = getAccessControlConditions([
      auth.user.address,
      eventOwnerAddress,
      SIMPLR_ADDRESS,
    ])

    // Creating raw data as object for encryption
    const rawData = Object.create(query)
    delete rawData.eventname

    // Encrypt raw user data using Lit Protocol
    const { encryptedString, symmetricKey } = await encryptRawData(rawData)

    // Create encrypted key for decryption later
    const encryptedSymmetricKey = await litClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig: signature,
      chain: 'mumbai',
    })

    // Pinning encrypted string file to NFT Storage
    const encryptedStringHash = await pinBlobToIPFS(encryptedString)

    // Define Secret object used for decryption of data
    const secret = {
      description: `A secret was sealed when claiming ticket from ${
        query.eventname
      } on ${Date.now()}`,
      name: query.eventname,
      external_url: '',
      image: new Blob(),
      image_description: 'Photo by Folco Masi on Unsplash',
      secret: {
        accessControlConditions: accessControlConditions,
        encryptedSymmetricKey: encryptedSymmetricKey,
        encryptedStringHash: encryptedStringHash,
      },
      attributes: [
        {
          display_type: 'date',
          trait_type: 'sealed on',
          value: Math.floor(Date.now() / 1000),
        },
      ],
    }

    // Pinning the secret to NFT Storage
    const secretHash = await pinDataToIPFS(secret)
    setSecretHash(secretHash)

    // Move to next step
    setCurrentStep(ENCRYPTION_STEPS.MINT_TICKET)
  }

  const handleTicketMinting = async () => {
    const arcanaProvider = auth.provider
    const provider = new ethers.providers.Web3Provider(arcanaProvider)
    const signer = provider.getSigner()
    const { chainId, name } = getNetwork()
    const targetAddress =
      contracts?.[chainId][0]?.contracts?.['SimplrEvents']?.['address']
    const abi = [
      contracts?.[chainId][0]?.contracts?.['SimplrEvents']?.['abi'].find(
        (el) => el.name === 'mintTicket',
      ),
    ]

    const contract = new ethers.Contract(targetAddress, abi, signer)

    const { data } = await contract.populateTransaction.mintTicket(
      auth.user.address,
      BigNumber.from(query.batchid),
      hashQueryData(query),
      secretHash.ipnft,
      proofs,
    )

    const request: SponsoredCallERC2771Request = {
      chainId: parseInt(chainId),
      target: targetAddress,
      data,
      user: auth.user.address,
    }
    const relay = new GelatoRelay()
    const relayResponse = await relay.sponsoredCallERC2771(
      request,
      provider,
      GELATO_API_KEY,
    )

    console.log({ request, targetAddress, relayResponse })

    getRelayStatus(relayResponse?.taskId).then((res) => {
      if (true) {
        console.log({ res })
      } else {
        setCurrentStep(ENCRYPTION_STEPS.CLAIM_TICKET)
      }
    })
  }

  return (
    <div className="mt-10 px-2">
      <ol className="relative border-l border-gray-200">
        <EncryptionStep
          step={ENCRYPTION_STEPS.GET_SIGNATURE}
          currentStep={currentStep}
          label="Sign Message from Lit Protocol"
        >
          <If
            condition={!signature}
            then={
              <button
                className="flex items-center gap-x-1 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={handleSignature}
              >
                Sign Message
                <div className="animate-bounce-right">
                  <ChevronRight size={18} />
                </div>
              </button>
            }
          />
        </EncryptionStep>
        <EncryptionStep
          step={ENCRYPTION_STEPS.ENCRYPTING}
          currentStep={currentStep}
          label="Encrypting Data and Pinning to IPFS"
        ></EncryptionStep>
        <EncryptionStep
          step={ENCRYPTION_STEPS.MINT_TICKET}
          currentStep={currentStep}
          label="Mint Ticket"
        ></EncryptionStep>
        <EncryptionStep
          step={ENCRYPTION_STEPS.CLAIM_TICKET}
          currentStep={currentStep}
          label="Claim Ticket"
        ></EncryptionStep>
      </ol>
    </div>
  )
}

export default DataEncryptionSection

interface EncryptionStepProps {
  step: number
  currentStep: number
  label: string
  children?: React.ReactNode
}

const EncryptionStep = ({
  step,
  currentStep,
  label,
  children,
}: EncryptionStepProps) => {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
        <If
          condition={currentStep <= step}
          then={
            <If
              condition={currentStep === step}
              then={<Spinner />}
              else={<div className="h-4 w-4 rounded-full bg-blue-600"></div>}
            />
          }
          else={
            <div className="bg-white text-green-600">
              <CircleCheckFill strokeWidth={2} size={25} color="currentColor" />
            </div>
          }
        />
      </span>
      <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-900 ">
        {label}
      </h3>
      {children}
    </li>
  )
}
