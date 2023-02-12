import { useAuth } from '@arcana/auth-react'
import React, { useEffect, useState } from 'react'
import LitJsSdk from '@lit-protocol/sdk-browser'
import { QueryProps } from '../../types'
import {
  ClaimTicketRequestBody,
  delay,
  encryptRawData,
  getAccessControlConditions,
  getRelayStatus,
  pinBlobToIPFS,
  pinDataToIPFS,
  sendInfoToServer,
} from '../../utils'
import { CLAIM_STEPS } from './constants'
import { client } from '@/components/ApolloClient'
import { FETCH_EVENT_OWNER_QUERY } from '@/graphql/query/fetchEventOwnerAddress'
import { Blob } from 'nft.storage'
import { SIMPLR_ADDRESS } from '@/utils/constants'
import SignatureStep from './SignatureStep'
import SecurityStep from './SecurityStep'
import MintingStep from './MintingStep'
import FinalStep from './FinalStep'

const ClaimSection = ({
  query,
  setStep,
}: {
  query: QueryProps
  setStep: (number) => void
}) => {
  const auth = useAuth()
  const [signature, setSignature] = useState()
  const [currentStep, setCurrentStep] = useState(CLAIM_STEPS.GET_SIGNATURE)
  const [secretHash, setSecretHash] = useState(null)
  const [taskId, setTaskId] = useState('')
  const [mintFailed, setMintFailed] = useState(false)

  useEffect(() => {
    if (currentStep === CLAIM_STEPS.ENCRYPTING) {
      handleEncryptandPin()
    } else if (currentStep === CLAIM_STEPS.CLAIM_TICKET) {
      handleClaimTicket()
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
        name: 'Vivacity 2023',
      },
    })
    console.log({ eventData })
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
    setSecretHash(secretHash.ipnft)

    // Move to next step
    setCurrentStep(CLAIM_STEPS.MINT_TICKET)
  }

  const handleClaimTicket = async () => {
    let confirmation = false
    while (!confirmation) {
      getRelayStatus(taskId).then((task) => {
        console.log({ task })
        const taskStatus = task?.taskState
        if (taskStatus === 'CheckPending') {
          confirmation = false
        } else {
          console.log({ taskStatus })
          if (taskStatus === 'ExecSuccess') {
            confirmation = true
            const body: ClaimTicketRequestBody = {
              accountAddress: auth.user.address,
              claimTimestamp: Math.abs(
                new Date(task?.executionDate).getTime() / 1000,
              ),
              claimTrx: task?.transactionHash,
              email: query.emailid,
              firstName: query.firstname,
              lastName: query.lastname,
            }
            console.log({ body })
            setCurrentStep(CLAIM_STEPS.FINISHED)
            sendInfoToServer(body)
          } else if (taskStatus === 'Cancelled') {
            alert('Transaction Failed! Try Again!')
            confirmation = true
            setMintFailed(true)
            setCurrentStep(CLAIM_STEPS.FINISHED)
          }
        }
      })
      await delay(2000)
    }
  }

  return (
    <div className="mt-10 px-2">
      <ol className="relative border-l border-gray-200">
        <SignatureStep
          {...{ currentStep, signature, setCurrentStep, setSignature }}
        />
        <SecurityStep {...{ currentStep }} />
        <MintingStep
          {...{
            currentStep,
            setCurrentStep,
            mintFailed,
            query,
            secretHash,
            setTaskId,
          }}
        />
        <FinalStep {...{ currentStep, mintFailed, setStep }} />
      </ol>
    </div>
  )
}

export default ClaimSection
