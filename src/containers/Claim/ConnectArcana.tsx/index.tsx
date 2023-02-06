import React from 'react'
import { Auth, useAuth } from '@arcana/auth-react'

const ConnectArcana = () => {
  const auth = useAuth()
  const handleLogin = () => {
    console.log('Logged In', { auth: auth.user })
  }

  const handleConnect = async (e) => {
    e.preventDefault()
    await auth.loginWithSocial('google')
  }
  return (
    <div>
      {/* <Auth externalWallet={true} theme="light" onLogin={handleLogin} /> */}
      <button
        className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleConnect}
      >
        Button
      </button>
    </div>
  )
}

export default ConnectArcana
