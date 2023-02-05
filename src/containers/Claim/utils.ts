import { client } from '@/components/ApolloClient'
import { FETCH_TREE_CID_QUERY } from '@/graphql/query/fetchTreeCid'
import axios from 'axios'
import { keccak256, toUtf8Bytes } from 'ethers'
import { QueryProps } from './types'

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

export const verifyQueryDetails = async (query: QueryProps, cid: string) => {
  const merkleHashes: string[] = await getMerkleHashes(cid)
  const { firstname, lastname, batchid, eventname, emailid } = query
  const concatenatedString = `${emailid}-${lastname}-${firstname}-${batchid}-${eventname}`
  const hash = keccak256(toUtf8Bytes(concatenatedString))
  const index = merkleHashes.findIndex((h) => h === hash)
  if (index != -1) {
    return true
  } else return false
}
