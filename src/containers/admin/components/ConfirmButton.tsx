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
  GET_ALLOWED_MINTERS,
  sendDataToIPFS,
  sendDataToServer,
} from '../utils'
import toast from 'react-hot-toast'
import ConnectWallet from '@/components/Navbar/ConnectWallet'
import { CONTRACT_ADDRESS } from '@/utils/constants'

const ConfirmButton = () => {
  const provider = useProvider()
  const [contract, setContract] = useState<ethers.Contract>()
  const [loading, setLoading] = useState<boolean>(false)
  const user = useAppSelector(userSelector)
  const id = CONTRACT_ADDRESS
  const contractName = 'Event'
  const { data: signer } = useSigner()
  const userInputHashes = []
  const batch = useAppSelector(batchSelector)
  const dispatch = useAppDispatch()
  const [allowed, setAllowed] = useState<boolean>(false)

  useEffect(() => {
    if (id && provider && contractName) {
      const abi = getContractDetails()
      const contract = new ethers.Contract(id, abi, signer)
      setContract(contract)
    }
  }, [id, provider, contractName, signer])

  useEffect(() => {
    if (user.exists) {
      GET_ALLOWED_MINTERS().then((data) => {
        data.minters.map((minter) => {
          if (minter.address.address === user.address.toLowerCase()) {
            setAllowed(true)
          }
        })
      })
    }
  }, [user])

  const addExcelInputData = async () => {
    setLoading(true)
    const num = batch.batchId
    handleHashes(num)
  }

  const handleHashes = async (nextBatchId) => {
    console.log(nextBatchId)

    await batch?.inputParams?.map(async (data) => {
      const dataExample = {
        firstname: data.firstName,
        lastname: data.lastName,
        emailid: data.email,
        batchid: nextBatchId.toString(),
        eventname: 'Vivacity 2023',
      }
      getHashes(dataExample).then((res) => userInputHashes.push(res))
    })
    const cid = await sendDataToIPFS(userInputHashes)
    const merkleRoot = await getMerkleTreeRoot(userInputHashes)
    await addBatchToContract(merkleRoot, cid, nextBatchId)
  }

  const addBatchToContract = async (root, cid, nextBatchId) => {
    console.log('Inputs:', 'merkleRoot:', root, 'cid:', cid)
    const transaction = contract
      ?.connect(signer)
      ?.addBatch(root, cid, { value: 0 })
      .then(async (res) => {
        console.log(res)
        dispatch(incrementBatchId())
        setLoading(false)
        setTimeout(removeCurrentBatch, 3000)
        const serverData = {
          inputParams: batch.inputParams,
          batchId: nextBatchId.toString(),
          eventName: 'Vivacity 2023',
          contractAddress: CONTRACT_ADDRESS,
          addBatchTimestamp: Date.now(),
        }
        const response = await sendDataToServer(serverData)
        if (response.status !== 200) {
          toast(`❌ Something went wrong! Please Try Again`)
        } else {
          toast(`🎉 Succesfully added batch #${nextBatchId}`)
        }
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
        condition={user.exists && batch.inputParams.length !== 0}
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
              disabled={!allowed || loading}
              className={`disabled:hover:empty: mr-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 disabled:cursor-not-allowed`}
            >
              {loading ? 'Loading' : `Add Data to Batch #${batch.batchId}`}
            </button>
          </div>
        }
      />
      <If condition={!user.exists} then={<ConnectWallet />} />
    </div>
  )
}

export default ConfirmButton
