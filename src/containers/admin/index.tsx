import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from '../admin/components/ExcelInput'
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
