import If from '@/components/If'
import useContract from '@/ethereum/useContract'
import useCustomContract, {
  getContractDetails,
} from '@/ethereum/useCustomContract'
import useEthers from '@/ethereum/useEthers'
import { addBatchId, batchSelector, removeBatch } from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { userSelector } from '@/redux/user'
import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'
import {
  getHashes,
  getMerkleTreeRoot,
  GET_CURRENT_BATCH_ID,
  sendDataToIPFS,
  sendDataToServer,
} from '../utils'

const ConfirmButton = () => {
  const provider = useProvider()
  const [contract, setContract] = useState<ethers.Contract>()
  const [loading, setLoading] = useState<boolean>()

  const user = useAppSelector(userSelector)
  const id = '0x40c5d0cac2b8533c67cf5f08146886c7a3efeca7'
  const contractName = 'Event'
  const { data: signer } = useSigner()

  const userInputHashes = []
  const batch = useAppSelector(batchSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id && provider && contractName) {
      const abi = getContractDetails()
      const contract = new ethers.Contract(id, abi, signer)
      setContract(contract)
    }
  }, [id, provider, contractName, signer])

  useEffect(() => {
    console.log(batch.inputParams)
  }, [batch])

  const addExcelInputData = async () => {
    setLoading(true)
    GET_CURRENT_BATCH_ID().then((data) => {
      const num = parseInt(data.batches[0].batchId) + 1
      dispatch(addBatchId(num))
    })
    await handleHashes()
  }

  const handleHashes = async () => {
    console.log(batch.batchId)
    const serverData = {
      inputParams: batch.inputParams,
      batchId: batch.batchId,
      eventName: batch.eventName,
      contractAddress: '0x40c5d0cac2b8533c67cf5f08146886c7a3efeca7',
      addBatchTimestamp: Date.now(),
    }
    // const res = await sendDataToServer(serverData)
    // console.log(res)

    await batch?.inputParams?.map(async (data, index) => {
      console.log(data)
      const dataExample = {
        firstname: data.firstName,
        lastname: data.lastName,
        emailid: data.email,
        batchid: batch.batchId.toString(),
        eventname: 'Vivacity:2023',
      }
      await getHashes(dataExample).then((res) => userInputHashes.push(res))
    })
    console.log(userInputHashes)
    const cid = await sendDataToIPFS(userInputHashes).then((id) => {
      return id
    })
    console.log(cid)
    const merkleRoot = await getMerkleTreeRoot(userInputHashes).then((root) => {
      return root
    })
    setLoading(false)
    // dispatch(removeBatch())

    // const res = await addBatchToContract(merkleRoot, cid).then((response) => {
    //   return response
    // })
    // console.log(res)
  }

  const addBatchToContract = async (root, cid) => {
    console.log('Inputs:', 'merkleRoot:', root, 'cid:', id)
    const transaction = await contract
      ?.connect(signer)
      ?.addBatch(root, cid, { value: 0 })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <If
        condition={batch.inputParams.length !== 0}
        then={
          <div className="m-3 flex justify-end p-1">
            {/* <button
              type="button"
              onClick={addExcelInputData}
              className="mr-2 rounded-lg bg-blue-700 px-5 py-4 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Data
            </button> */}
            <button
              type="button"
              onClick={addExcelInputData}
              className={`mr-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:${
                loading ? 'true' : 'false'
              } cursor-progress:${loading ? 'true' : 'false'}`}
            >
              {loading ? 'Loading' : 'Add Data'}
            </button>
          </div>
        }
      />
    </div>
  )
}

export default ConfirmButton
