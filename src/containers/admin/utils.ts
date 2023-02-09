import { ethers } from 'ethers'
import { QueryProps } from './types'
import axios from 'axios'

const PINATA_KEY_SECRET =
  '7c02de12e4bb768fd27a10a6692863056e5542354c20c2a875de0b1703b9445f'
const PINATA_KEY = '10fda7f374970f218067'
const PINATA_URL = 'https://api.pinata.cloud/'

export const getHashes = async (query: QueryProps) => {
  const { firstname, lastname, batchid, eventname, emailid } = query
  const concatenatedString = `${emailid}-${lastname}-${firstname}-${batchid}-${eventname}`
  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(concatenatedString),
  )
  return hash
}

export const sendDataToIPFS = async (hashedData) => {
  const data = JSON.stringify(hashedData)
  console.log(data)

  const res = await axios
    .post(`${PINATA_URL}pinning/pinJSONToIPFS`, data, {
      headers: {
        pinata_api_key: PINATA_KEY,
        pinata_secret_api_key: PINATA_KEY_SECRET,
      },
    })
    .then(function (response) {
      //handle response here
      console.log(response)
    })
    .catch(function (error) {
      //handle error here
      console.log(error)
    })
  console.log(res)
}
