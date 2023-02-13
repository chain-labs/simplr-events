import React, { useState } from 'react'
import bcrypt from 'bcryptjs-react'
import { useAppDispatch } from '@/redux/hooks'
import { setStep } from '@/redux/login'
import { toast, Toaster } from 'react-hot-toast'

const Login = () => {
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const hash = sessionStorage.getItem('password')
    console.log(hash)
    console.log(bcrypt.compareSync(password, hash))
    if (bcrypt.compareSync(password, hash)) {
      console.log('valid')
      toast('login Successfull', { duration: 3000 })
      setTimeout(changeStep, 4000)
    } else {
      toast('Invalid Password')
      setPassword('')
    }
  }
  const changeStep = () => {
    dispatch(setStep(2))
  }
  return (
    <div className="w-screen p-10">
      <Toaster position="top-center" />
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
