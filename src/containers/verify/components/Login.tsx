import React, { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { toast } from 'react-hot-toast'
import { setStep } from '@/redux/verify'
import { STATIC_PASSWORD } from '@/utils/constants'
import { STEPS } from '../constants'
import { ethers } from 'ethers'

const Login = () => {
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(password))
    console.log({ loginHash: hash, loginPassword: password })
    if (hash === STATIC_PASSWORD) {
      console.log({ loginMessage: 'Hash is valid' })
      toast('login Successfull')
      changeStep()
    } else {
      toast('Invalid Password')
      setPassword('')
    }
  }

  const changeStep = () => {
    dispatch(setStep(STEPS.QRSCAN))
  }
  return (
    <div className="w-screen p-10">
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Enter Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          required
        ></input>
      </div>

      <button
        type="submit"
        onClick={handleLogin}
        className="w-full rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 "
      >
        Submit
      </button>
    </div>
  )
}

export default Login
