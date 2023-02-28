import If from '@/components/If'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { toast, Toaster } from 'react-hot-toast'
import Animation from './Animation'
import Modal from './Modal'
import { GET_TICKET_OWNER_ID, sendTokenIdToServer } from '../utils'
import { ethers } from 'ethers'

const QrScan = () => {
  const [mode, setMode] = useState('environment')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [errorOccured, setErrorOcurred] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleResult = async (result) => {
    const qrCodeData = JSON.parse(result)
    const signerAddress = ethers.utils.verifyMessage(
      qrCodeData.message,
      qrCodeData.signature,
    )
    console.log(signerAddress)
    const isOwner = await checkIfSignerAddressIsOwnerOfTokenId(
      qrCodeData.tokenId,
      qrCodeData.contractAddress.toLowerCase(),
      signerAddress,
    )
    console.log(isOwner)
    if (isOwner) {
      alert(`Inside owner ${isOwner}`)
      const data = {
        accountAddress: signerAddress,
        tokenId: qrCodeData.tokenId,
        contractAddress: qrCodeData.contractAddress,
        redeemedTimestamp: Date.now(),
      }
      const serverResponse = await sendTokenIdToServer(data)
      console.log(serverResponse)
      if (serverResponse.data.success) {
        handleCloseScan()
        setErrorOcurred(false)
        setSuccessMessage(serverResponse.data.data.message)
        setShowModal(true)
      } else {
        handleCloseScan()
        setErrorOcurred(true)
        setError(serverResponse.data.data.message)
        setShowModal(true)
      }
    } else {
      setErrorOcurred(true)
      setError('Owner is not valid')
      setShowModal(true)
    }
    setLoadingScan(false)
  }

  const checkIfSignerAddressIsOwnerOfTokenId = async (
    tokenId,
    contractAddress,
    signerAddress,
  ) => {
    const id = `ticket-${contractAddress}-${tokenId}`
    console.log(id)
    const data = await GET_TICKET_OWNER_ID(id)
    return data.ticket.holder.address.id === signerAddress.toLowerCase()
  }

  const handleCloseScan = async () => {
    setStartScan(false)
    try {
      navigator.getUserMedia(
        { audio: false, video: true },
        function (stream) {
          const track = stream.getTracks()[0] // if only one media track
          track.stop()
        },
        function (error) {
          console.log('getUserMedia() error', error)
        },
      )
    } catch (e) {
      console.log(e)
    }
  }

  const handleError = () => {
    setErrorOcurred(true)
    setError('Something went wrong while scanning')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <Toaster />
      <div className="w-screen bg-white ">
        <div className="flex-row items-center justify-center">
          <div className="flex-row items-center justify-center"></div>
        </div>
        <If
          condition={startScan}
          then={
            <div className="w-full">
              <QrReader
                constraints={{ facingMode: mode }}
                scanDelay={2000}
                onResult={(result, error) => {
                  if (result) {
                    handleResult(result)
                  }
                  if (error) {
                    console.info(error)
                  }
                }}
              />
            </div>
          }
        />
      </div>
      <div className="w-screen flex-row items-center justify-center p-10">
        {loadingScan && <p>Loading</p>}
        <button
          onClick={() => {
            setStartScan(true)
          }}
          className="flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
        >
          {startScan ? <Animation /> : ''}
          {startScan ? 'Scanning' : 'Start Scan'}
        </button>{' '}
        <If
          condition={startScan}
          then={
            <button
              onClick={() => {
                handleCloseScan()
              }}
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
            >
              Stop Scan
            </button>
          }
        />
        {showModal && (
          <Modal
            onCancel={handleCloseModal}
            errorPresent={errorOccured}
            error={error}
            setError={setError}
            message={successMessage}
            setStartScan={setStartScan}
          />
        )}
      </div>
    </div>
  )
}

export default QrScan
