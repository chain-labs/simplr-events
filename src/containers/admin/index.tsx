import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from '../admin/components/ExcelInput'
import axios from 'axios'

const AdminComp = () => {
  return (
    <div>
      <ExcelInput />
    </div>
  )
}

export default AdminComp
