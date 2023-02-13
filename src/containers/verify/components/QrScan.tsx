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
    // marginTop: '20px',
    width: '300px',
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
    <div className="bg-white">
      <div style={camStyle}>
        {/* <select onChange={(e) => setMode(e.target.value)}>
          <option value={'environment'}>Back Camera</option>
          <option value={'user'}>Front Camera</option>
        </select> */}
        <button
          onClick={() => {
            setStartScan(!startScan)
          }}
        >
          {startScan ? 'Stop Scan' : 'Start Scan'}
        </button>{' '}
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
          //   facingMode={mode}
          videoStyle={{ width: '200px', padding: '0px' }}
        />
      </div>
      {/* Hi{data} */}
      {loadingScan && <p>Loading</p>}
      {/* {data !== '' && <p>{data}</p>}{' '} */}
    </div>
  )
}

export default QrScan
