import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from '../admin/components/ExcelInput'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

const AdminComp = () => {
  return (
    <div>
      <Toaster position="top-center" />

      <ExcelInput />
    </div>
  )
}

export default AdminComp
