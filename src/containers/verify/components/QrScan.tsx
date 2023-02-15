import If from '@/components/If'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { toast, Toaster } from 'react-hot-toast'
import Animation from './Animation'
import Modal from './Modal'
import { json } from 'node:stream/consumers'

const QrScan = () => {
  const [mode, setMode] = useState('environment')
  const [showModal, setShowModal] = useState<boolean>(true)
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const [errorOccured, setErrorOcurred] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleResult = (result) => {
    setData(result?.text)
    const res = result.text
    const parsedData = JSON.parse(result?.text)
    alert(result.text)
    const mess = []
    for (let i = 2; i < parsedData.message.length - 2; i = i + 2) {
      const subpart = parseInt(parsedData.message.slice(i, i + 2), 16)
      const char = String.fromCharCode(subpart)
      mess.push(char)
    }
    alert(mess.join(' '))
    setLoadingScan(false)
  }

  const handleScan = async () => {
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

  const handleError = (error) => {
    setErrorOcurred(true)
    setError('error')
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
                    // alert(typeof result?.text)
                  }

                  if (error) {
                    handleError(error)
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
                handleScan()
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
