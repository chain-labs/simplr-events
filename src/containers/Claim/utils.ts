import { client } from '@/components/ApolloClient'
import { FormData } from 'nft.storage'
import { FETCH_TREE_CID_QUERY } from '@/graphql/query/fetchTreeCid'
import axios from 'axios'
import LitJsSdk from '@lit-protocol/sdk-browser'
import { BytesLike, ethers } from 'ethers'
import { QueryProps } from './types'
import { NFTStorage } from 'nft.storage'
import {
  NFT_STORAGE_TOKEN,
  RELAY_TASK_CHECK_ENDPOINT,
  SERVER_ENDPOINT,
} from '@/utils/constants'

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
  console.log({ data })

  return JSON.parse(Object.keys(data)[0])
}

export const hashQueryData = (query) => {
  const { emailid, lastname, firstname, eventname, batchid } = query
  const concatenatedString = `${emailid}-${lastname}-${firstname}-${batchid}-${eventname}`
  console.log({ concatenatedString })

  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(concatenatedString),
  )

  console.log({ hash })

  return hash
}

export const verifyQueryDetails = async (query: QueryProps, cid: string) => {
  console.log({ query, cid })

  const merkleHashes: string[] = await getMerkleHashes(cid)
  console.log({ merkleHashes })

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
  const accessControlConditions = []
  addresses.forEach((address) => {
    const condition = {
      contractAddress: '',
      standardContractType: '',
      chain: chain,
      method: '',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '=',
        value: address,
      },
    }
    accessControlConditions.push(condition)
    accessControlConditions.push({ operator: 'or' })
  })
  accessControlConditions.pop()
  return accessControlConditions
}

export const pinJson = async (JSONBody) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
  return (
    await axios.post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
      },
    })
  ).data.IpfsHash
}

export const pinFile = async (file, eventname) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  const data = new FormData()
  data.append('file', file, 'encryptedString.bin')
  const metadata = JSON.stringify({
    name: `${eventname}_encryptedString`,
  })
  data.append('pinataMetadata', metadata)
  return axios.post(url, data, {
    maxBodyLength: Infinity, //this is needed to prevent axios from erroring out with large files
    headers: {
      'Content-Type': 'multipart/form-data',
      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
    },
  })
}

export const getRelayStatus = async (taskId: string) => {
  const endpoint = `${RELAY_TASK_CHECK_ENDPOINT}${taskId}`
  const res = await axios.get(endpoint)
  console.log({ res: res.data })
  return res.data?.task
}

export interface ClaimTicketRequestBody {
  email: string
  firstName: string
  lastName: string
  accountAddress: BytesLike
  claimTimestamp: number
  claimTrx: BytesLike
}

export const sendInfoToServer = async (body: ClaimTicketRequestBody) => {
  const res = await axios.post(`${SERVER_ENDPOINT}/claimTicket`, body)
  console.log({ res })
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
