import { client } from '@/components/ApolloClient'
import { FETCH_TREE_CID_QUERY } from '@/graphql/query/fetchTreeCid'
import axios from 'axios'
import LitJsSdk from '@lit-protocol/sdk-browser'
import { ethers } from 'ethers'
import { QueryProps } from './types'
import { NFTStorage, Blob } from 'nft.storage'
import { NFT_STORAGE_TOKEN, RELAY_TASK_CHECK_ENDPOINT } from '@/utils/constants'

const NFTStorageClient = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const FETCH_TREE_CID = async (id: string) => {
  const { data } = await client.query({
    query: FETCH_TREE_CID_QUERY,
    variables: {
      id,
    },
  })

  return data
}

export const getMerkleHashes = async (cid: string) => {
  const url = `https://nftstorage.link/ipfs/${cid}`
  const { data } = await axios.get(url)
  return data
}

export const hashQueryData = (query) => {
  const { emailid, lastname, firstname, eventname, batchid } = query
  const concatenatedString = `${emailid}-${lastname}-${firstname}-${batchid}-${eventname}`
  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(concatenatedString),
  )
  return hash
}

export const verifyQueryDetails = async (query: QueryProps, cid: string) => {
  console.log({ query, cid })

  const hashes: string[] = await getMerkleHashes(cid)
  const merkleHashes = JSON.parse(Object.keys(hashes)[0])
  const hash = hashQueryData(query)

  const index = merkleHashes.findIndex((h) => h === hash)
  console.log({ merkleHashes, hash, index })
  if (index != -1) {
    return true
  } else return false
}

export const getSignature = async (auth) => {
  const provider = new ethers.providers.Web3Provider(auth.provider)
  const authSig = await LitJsSdk.signAndSaveAuthMessage({
    web3: provider,
    account: auth.user?.address,
    chainId: 80001,
  })
  return authSig
}

export const encryptRawData = async (data) => {
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
    JSON.stringify(data),
  )
  return { encryptedString, symmetricKey }
}

const chain = 'mumbai'

export const getAccessControlConditions = (addresses: string[]) => {
  const accessControlConditions = addresses.map((address) => ({
    contractAddress: '',
    standardContractType: '',
    chain: chain,
    method: '',
    parameters: [':userAddress'],
    returnValueTest: {
      comparator: '=',
      value: address,
    },
  }))
  return accessControlConditions
}

export const pinBlobToIPFS = async (data) => {
  const cid = await NFTStorageClient.storeBlob(data)
  return cid
}

export const pinDataToIPFS = async (data) => {
  const cid = await NFTStorageClient.store(data)
  return cid
}

export const getRelayStatus = async (taskId: string) => {
  const endpoint = `${RELAY_TASK_CHECK_ENDPOINT}${taskId}`
  const res = await axios.get(endpoint)
  console.log({ res: res.data })
}
