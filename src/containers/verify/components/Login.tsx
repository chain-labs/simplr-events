import React, { useState } from 'react'
import bcrypt from 'bcryptjs-react'
import { useAppDispatch } from '@/redux/hooks'
import { toast, Toaster } from 'react-hot-toast'
import { setStep } from '@/redux/verify'
import { STATIC_PASSWORD } from '@/utils/constants'

// const STATIC_PASSWORD =
//   '$2a$10$hgdaIRpS3h56ZKL9amZQreVDQgJY3T9VR4wv/Y7P3/tvbhEggaVgO'

const Login = () => {
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    console.log(hash)
    console.log(STATIC_PASSWORD)
    if (bcrypt.compareSync(password, STATIC_PASSWORD)) {
      console.log('valid')
      toast('login Successfull', { duration: 3000 })
      setTimeout(changeStep, 4000)
    } else {
      toast('Invalid Password')
      setPassword('')
    }
  }

  const changeStep = () => {
    dispatch(setStep(1))
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
