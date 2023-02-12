import If from '@/components/If'
import { getContractDetails } from '@/ethereum/useCustomContract'
import useEthers from '@/ethereum/useEthers'
import {
  addKey,
  batchSelector,
  incrementBatchId,
  removeBatch,
} from '@/redux/batch'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { userSelector } from '@/redux/user'
import axios from 'axios'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'
import {
  getHashes,
  getMerkleTreeRoot,
  sendDataToIPFS,
  sendDataToServer,
} from '../utils'
import toast from 'react-hot-toast'

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

  const addExcelInputData = async () => {
    setLoading(true)
    const num = batch.batchId
    console.log(batch.batchId)
    handleHashes(num)
  }

  const handleHashes = async (nextBatchId) => {
    console.log(nextBatchId)
    const serverData = {
      inputParams: batch.inputParams,
      batchId: nextBatchId,
      eventName: 'Vivacity 2023',
      contractAddress: '0x40c5d0cac2b8533c67cf5f08146886c7a3efeca7',
      addBatchTimestamp: Date.now(),
    }
    // const response = await sendDataToServer(serverData)
    // console.log(response)
    console.log('ServerData:', serverData)

    await batch?.inputParams?.map(async (data, index) => {
      console.log(data)
      const dataExample = {
        firstname: data.firstName,
        lastname: data.lastName,
        emailid: data.email,
        batchid: nextBatchId.toString(),
        eventname: 'Vivacity 2023',
      }
      getHashes(dataExample).then((res) => userInputHashes.push(res))
    })
    console.log(userInputHashes)
    const cid = await sendDataToIPFS(userInputHashes)
    console.log(cid)
    const merkleRoot = await getMerkleTreeRoot(userInputHashes)

    const res = await addBatchToContract(merkleRoot, cid).then((response) => {
      return response
    })
  }

  const addBatchToContract = async (root, cid) => {
    console.log('Inputs:', 'merkleRoot:', root, 'cid:', cid)
    const transaction = contract
      ?.connect(signer)
      ?.addBatch(root, cid, { value: 0 })
      .then((res) => {
        console.log(res)
        toast(`🎉 Succesfully added batch`)
        dispatch(incrementBatchId())
        setLoading(false)
        setTimeout(removeCurrentBatch, 3000)
      })
      .catch((err) => {
        toast(`❌ Something went wrong! Please Try Again`)
        setLoading(false)
      })
  }

  const removeCurrentBatch = () => {
    dispatch(addKey())
    dispatch(removeBatch())
  }

  return (
    <div>
      <If
        condition={batch.inputParams.length !== 0}
        then={
          <div>
            {/* <button
              type="button"
              onClick={addExcelInputData}
              className="mr-2 rounded-lg bg-violet-700 px-5 py-4 text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
            >
              Add Data
            </button> */}
            <button
              type="button"
              onClick={
                !loading && user.exists ? () => addExcelInputData() : () => ''
              }
              disabled={!user.exists || loading}
              className={`disabled:hover:empty: mr-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 disabled:cursor-not-allowed dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 `}
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
