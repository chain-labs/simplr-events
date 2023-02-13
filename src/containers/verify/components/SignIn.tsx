import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs-react'
import { useAppDispatch } from '@/redux/hooks'
import { setStep } from '@/redux/login'
import toast, { Toaster } from 'react-hot-toast'

const SignIn = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [valid, setValid] = useState<boolean>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (password === confirmPassword) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [confirmPassword])

  const handleSignup = () => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    console.log(salt)
    console.log(hash)
    console.log(bcrypt.compareSync(password, hash))
    sessionStorage.setItem('password', hash)
    toast('signup successful', { duration: 3000 })
    setTimeout(changeStep, 4000)
  }

  const changeStep = () => {
    dispatch(setStep(1))
  }

  return (
    <div className="w-screen p-10">
      <Toaster position="top-center" />

      <div className="mb-6">
        <label htmlFor="password" className="mb-2 block text-sm font-medium  ">
          Create Password
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
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          required
        ></input>
        {!valid ? <p>Password is not matching</p> : ''}
        <p></p>
      </div>

      <button
        type="submit"
        onClick={handleSignup}
        className="w-full rounded-lg bg-violet-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 "
      >
        Submit
      </button>
    </div>
  )
}

export default SignIn
