import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'

const QrScan = () => {
  const [mode, setMode] = useState('environment')
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

  const handleScan = async (scanData) => {
    setLoadingScan(true)
    setStartScan(!startScan)
    console.log(`loaded data data`, scanData)
    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData)
      setData(scanData)
      setStartScan(false)
      setLoadingScan(false)
      // setPrecScan(scanData);
    }
  }
  const handleError = (err) => {
    console.error(err)
  }
  return (
    <div className="w-screen bg-white p-10">
      <div className="max-w-screen-md">
        {/* <select onChange={(e) => setMode(e.target.value)}>
          <option value={'environment'}>Back Camera</option>
          <option value={'user'}>Front Camera</option>
        </select> */}
        <QrReader
          constraints={{ facingMode: mode }}
          scanDelay={5000}
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
      {/* Hi{data} */}
      <div className="flex-row items-center justify-center">
        {loadingScan && <p>Loading</p>}
        <button
          onClick={() => {
            setStartScan(!startScan)
          }}
          className="w-full rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300"
        >
          {startScan ? 'Stop Scan' : 'Start Scan'}
        </button>{' '}
      </div>
      {/* {data !== '' && <p>{data}</p>}{' '} */}
    </div>
  )
}

export default QrScan
