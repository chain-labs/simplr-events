import React, { useState } from 'react'
import bcrypt from 'bcryptjs-react'
import { useAppDispatch } from '@/redux/hooks'
import { toast, Toaster } from 'react-hot-toast'
import { setStep } from '@/redux/verify'
// import { STATIC_PASSWORD } from '@/utils/constants'

const STATIC_PASSWORD =
  '$2a$10$hgdaIRpS3h56ZKL9amZQreVDQgJY3T9VR4wv/Y7P3/tvbhEggaVgO'

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

// {
//   "concatenatedMessage": "angel.lakra@chainlabs.in-0x4d1f9438d0677fDC7C0B807D4cf08c129EdFe8F4-17-0x40c5d0cac2b8533c67cf5f08146886c7a3efeca7",
//   "message": "0x616e67656c2e6c616b726140636861696e6c6162732e696e2d3078346431663934333864303637376644433743304238303744346366303863313239456446653846342d31372d307834306335643063616332623835333363363763663566303831343638383663376133656665636137"
// }
//0xd0abc893ad2a905c7fdf41e34cdac8419b29d704c0c594593647cfd3cfe8f29d2976da9ce26930abe965faf12dbded06da980d07e4e1f23eb1f2dbeb761928a21c
//0xf40b5add77f47182e5196805ca66ba7e8889b1f7ea43bac0d2d6b5e5fff23288456a9824f139a6c6fa29c2e1335aa446246da562160f016615c50a7d3da8002a1b
