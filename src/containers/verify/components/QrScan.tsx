import If from '@/components/If'
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { toast, Toaster } from 'react-hot-toast'
import Animation from './Animation'
import Modal from './Modal'

const QrScan = () => {
  const [mode, setMode] = useState('environment')
  const [showModal, setShowModal] = useState<boolean>(true)
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')

  const camStyle = {
    // display: 'flex',
    // justifycontent: 'center',
    // alignItems: 'center',
    // marginTop: '-25px',
    width: '80vh',
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
    } catch (e) {}
    // setLoadingScan(true)
    // setStartScan(!startScan)
    // console.log(`loaded data data`, scanData)
    // if (scanData && scanData !== '') {
    //   console.log(`loaded >>>`, scanData)
    //   setData(scanData)
    //   setStartScan(false)
    //   setLoadingScan(false)
    //   // setPrecScan(scanData);
    // }
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
                    setData(result?.text)
                    setLoadingScan(false)
                    alert(result)
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
                handleScan()
              }}
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
            >
              Stop Scan
            </button>
          }
        />
        {showModal && <Modal onCancel={handleCloseModal} />}
      </div>
    </div>
  )
}

export default QrScan
// https://codesandbox.io/s/modal-window-with-react-typescript-tailwind-eq1w5?file=/src/Basic.tsx
// https://codesandbox.io/s/react-tailwind-components-ln91r?from-embed=&file=/src/Modal.js
