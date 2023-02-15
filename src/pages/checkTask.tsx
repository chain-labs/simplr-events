import { getRelayStatus } from '@/containers/Claim/utils'
import { CONTRACT_ADDRESS, getNetwork } from '@/utils/constants'
import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import contracts from '@/contracts.json'

const CheckTask = () => {
  useEffect(() => {
    const taskId =
      '0x6089cdb706c5904b7882abd3a9c35f3385a688ed7d312ee045fd32130c87447d'

    getRelayStatus(taskId).then((task) => {
      console.log({ task })
      const transactionHash = task.transactionHash
      // @ts-expect-error window.ethereum
      const provider = new ethers.providers.Web3Provider(window?.ethereum)
      const { chainId } = getNetwork()
      const abi = contracts?.[chainId][0]?.contracts?.['SimplrEvents']?.['abi']
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

      contract.queryFilter(contract.filters.TicketCreated()).then((res) => {
        console.log({ res })
      })
    })
  }, [])
  return <div>CheckTask</div>
}

export default CheckTask
