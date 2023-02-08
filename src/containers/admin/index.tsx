import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import ExcelInput from './ExcelInput'
import axios from 'axios'

const AdminComp = () => {
  const sendData = () => {
    axios
      .post('http://localhost:3000/addBatch', {
        // Add parameters here
        data: {
          csv: {
            FirstName: 'Khushboo',
            LastName: 'Dalwani',
            Email: 'khushboodalwani74@gmail.com',
          },
        },
      })
      .then((response) => {
        console.log(response.data)
        // Handle data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
      <ExcelInput />
      <button onClick={sendData}>sendData</button>
    </div>
  )
}

export default AdminComp
