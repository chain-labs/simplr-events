import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from '../admin/components/ExcelInput'
import { Toaster } from 'react-hot-toast'

const AdminComp = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <h1 className=" text-5xl font-bold">Welcome, Admin!</h1>
      <p className="mt-2 w-2/3 font-normal">
        Ready to serve your guests with the cutting edge NFT presents?
      </p>
      <ExcelInput />
    </div>
  )
}

export default AdminComp
