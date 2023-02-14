import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import Spinner from '../../components/Spinner'
import LitJsSdk from '@lit-protocol/sdk-browser'
import { useAuth } from '@arcana/auth-react'
import { getNetwork } from '@/utils/constants'

const QRCodeComp = ({ qrData }: { qrData: any }) => {
  const [loading, setLoading] = useState(true)
  const [qrValue, setQrValue] = useState('')

  const auth = useAuth()

  const decrypt = async (signature, secretHash) => {
    const litClient = new LitJsSdk.LitNodeClient()
    await litClient.connect()
    const secretRes = await axios.get(
      `https://nftstorage.link/ipfs/${secretHash}/metadata.json`,
    )

    const secret = secretRes.data

    const encryptedStringRes = await axios.get(
      `https://nftstorage.link/ipfs/${secret?.secret?.encryptedStringHash}`,
    )

    const encryptedString = encryptedStringRes.data

    const network = getNetwork()

    const encryptionKeyBody = {
      accessControlConditions: secret?.secret?.accessControlConditions,
      toDecrypt: secret?.secret?.encryptedSymmetricKey,
      chain: network.name,
      authSig: signature,
    }

    const symmetricKey = await litClient.getEncryptionKey(encryptionKeyBody)

    console.log({ symmetricKey })

    return await LitJsSdk.decryptString(encryptedString, symmetricKey)
  }

  useEffect(() => {
    const { signature, secretHash } = qrData
    console.log({ secretHash })

    decrypt(signature, secretHash).then((decryptedString) => {
      console.log({ decryptedString })
    })
  }, [])
  if (!loading) {
    return (
      <div>
        <QRCode value={qrValue} />
      </div>
    )
  } else {
    return (
      <div className="mt-24 flex flex-col items-center justify-center ">
        <div className="h-16 w-16">
          <Spinner />
        </div>
        <div>Generating your QR Code...</div>
      </div>
    )
  }
}

export default QRCodeComp
