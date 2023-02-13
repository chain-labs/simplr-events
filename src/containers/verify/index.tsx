import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import QrScan from './components/QrScan'
import SignIn from './components/SignIn'
import bcrypt from 'bcryptjs-react'
import If from '@/components/If'
import Login from './components/Login'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loginReducer, loginSelector, setStep } from '@/redux/login'

const VerifyComp = () => {
  const [signedIn, setSignedIn] = useState<boolean>()
  const login = useAppSelector(loginSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sessionStorage.getItem('password')) {
      setSignedIn(true)
      dispatch(setStep(1))
    } else {
      dispatch(setStep(0))
    }
  }, [])

  if (login.step === 1) {
    return <Login />
  }
  if (login.step === 2) {
    return <QrScan />
  }
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default VerifyComp
