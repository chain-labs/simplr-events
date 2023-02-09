import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from './ExcelInput'
import axios from 'axios'
import ConfirmButton from './ConfirmButton'

const AdminComp = () => {
  // const [parsedData, setParsedData] = useState([])
  return (
    <div>
      <ExcelInput />
    </div>
  )
}

export default AdminComp
