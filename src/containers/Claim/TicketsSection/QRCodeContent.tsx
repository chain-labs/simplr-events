import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import Spinner from '../components/Spinner'

import LitJsSdk from '@lit-protocol/sdk-browser'
import axios from 'axios'
import { getSignature } from '../utils'
import { useAuth } from '@arcana/auth-react'
import { CONTRACT_ADDRESS, getNetwork } from '@/utils/constants'
import { ethers } from 'ethers'

interface Props {
  modalData: any
}

function utf8ToHex(str: string) {
  return (
    '0x' +
    Array.from(str)
      .map((c) =>
        c.charCodeAt(0) < 128
          ? c.charCodeAt(0).toString(16)
          : encodeURIComponent(c).replace(/\\%/g, '').toLowerCase(),
      )
      .join('')
  )
}

const QRCodeContent = ({ modalData }: Props) => {
  const [QRValue, setQRValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('Generating QR Code')

  const auth = useAuth()

  const onImageDownload = () => {
    const svg = document.getElementById('QRCode')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'QRCode'
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }

  const handleDecrypt = async (dataCid) => {
    const litClient = new LitJsSdk.LitNodeClient()
    await litClient.connect()

    console.log('yarn')
    const dataRes = await axios.get(
      `https://simplr.mypinata.cloud/ipfs/${dataCid}`,
    )

    console.log({ dataRes })

    const data = dataRes.data

    console.log({ data })

    const authSig = await getSignature(auth)

    console.log({ authSig })

    const { data: encryptedString } = await axios({
      url: `https://simplr.mypinata.cloud/ipfs/${data?.secret?.encryptedStringHash}`,
      method: `get`,
      responseType: `blob`,
    })

    // const encryptedString = encryptedStringRes.data

    console.log({ encryptedString })

    const network = getNetwork()

    const encryptionKeyBody = {
      accessControlConditions: data?.secret?.accessControlConditions,
      toDecrypt: data?.secret?.encryptedSymmetricKey,
      chain: network.name,
      authSig,
    }

    console.log({ encryptionKeyBody })

    const symmetricKey = await litClient.getEncryptionKey(encryptionKeyBody)

    console.log({ symmetricKey })

    return await LitJsSdk.decryptString(encryptedString, symmetricKey)
  }

  const handleQrGenerate = async (details) => {
    const concatenatedMessage = `${details?.emailid}-${auth.user.address}-${modalData?.tokenId}-${CONTRACT_ADDRESS}`
    const message = ethers.utils.keccak256(utf8ToHex(concatenatedMessage))

    console.log({ concatenatedMessage, message })
    const arcanaProvider = auth.provider
    const provider = new ethers.providers.Web3Provider(arcanaProvider)

    const signer = provider.getSigner()

    const signature = await signer.signMessage(message)

    console.log({ signature })

    const qrCodeData = {
      tokenId: modalData?.tokenId,
      message,
      contractAddress: CONTRACT_ADDRESS,
      signature,
    }

    setQRValue(JSON.stringify(qrCodeData))
    setLoading(false)
  }

  useEffect(() => {
    handleDecrypt(modalData?.dataCid).then((data) => {
      const details = JSON.parse(data)
      handleQrGenerate(details)
      console.log({ details })
    })
  }, [])

  if (!loading) {
    return (
      <div className="flex h-full flex-col items-center bg-white pt-4">
        <QRCode value={QRValue} id="QRCode" />
        <button
          className="mt-4 rounded-lg bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
          onClick={() => onImageDownload}
        >
          Download QR Code
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-16 w-16">
          <Spinner />
        </div>
        <div>{loadingText}</div>
      </div>
    )
  }
}

export default QRCodeContent
