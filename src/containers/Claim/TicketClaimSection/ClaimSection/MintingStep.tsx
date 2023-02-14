import If from '@/components/If'
import { GELATO_API_KEY, getNetwork } from '@/utils/constants'
import { useAuth } from '@arcana/auth-react'
import { BigNumber, ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import ClaimStepItem from './components/ClaimStepItem'
import { CLAIM_STEPS } from './constants'

import contracts from '@/contracts.json'
import { QueryProps } from '../../types'
import { FETCH_TREE_CID, getMerkleHashes, hashQueryData } from '../../utils'
import MerkleTree from 'merkletreejs'
import {
  GelatoRelay,
  SponsoredCallERC2771Request,
} from '@gelatonetwork/relay-sdk'
import { ChevronRight } from 'akar-icons'

interface Props {
  currentStep: number
  mintFailed: boolean
  query: QueryProps
  secretHash: string
  setCurrentStep: (number) => void
  setTaskId: (string) => void
}

const MintingStep = ({
  currentStep,
  setCurrentStep,
  mintFailed,
  query,
  secretHash,
  setTaskId,
}: Props) => {
  const [minting, setMinting] = useState(false)
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

  const auth = useAuth()

  const handleTicketMinting = async (e) => {
    e.preventDefault()

    setMinting(true)
    const arcanaProvider = auth.provider
    const provider = new ethers.providers.Web3Provider(arcanaProvider)
    const signer = provider.getSigner()
    const { chainId } = getNetwork()
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
      secretHash,
      proofs,
    )

    console.log({ data })

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

    setTaskId(relayResponse.taskId)
    setCurrentStep(CLAIM_STEPS.CLAIM_TICKET)
  }

  return (
    <ClaimStepItem
      step={CLAIM_STEPS.MINT_TICKET}
      currentStep={currentStep}
      label="Mint Ticket"
      failed={mintFailed}
    >
      <If
        condition={currentStep === CLAIM_STEPS.MINT_TICKET}
        then={
          <button
            className="flex items-center gap-x-1 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            onClick={handleTicketMinting}
            disabled={minting}
          >
            Claim your Ticket
            <div className="animate-bounce-right">
              <ChevronRight size={18} />
            </div>
          </button>
        }
      />
    </ClaimStepItem>
  )
}

export default MintingStep
