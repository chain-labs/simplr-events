import React, { useEffect, useState } from 'react'
import { Auth, useAuth } from '@arcana/auth-react'
import { ethers, providers } from 'ethers'
import { GoogleFill } from 'akar-icons'

const ConnectArcana = () => {
  const auth = useAuth()

  const [provider, setProvider] = useState<providers.Web3Provider>()
  const [signer, setSigner] = useState<providers.JsonRpcSigner>()
  const [user, setUser] = useState<string>()

  const handleConnect = async (e) => {
    e.preventDefault()
    const arcanaProvider = await auth.loginWithSocial('google')
    const provider = new ethers.providers.Web3Provider(arcanaProvider)
    const signer = provider.getSigner()
    setSigner(signer)
    setProvider(provider)
  }

  useEffect(() => {
    auth.logout()
  }, [])

  useEffect(() => {
    if (signer) {
      console.log({ signer: signer.getAddress() })
      signer.getAddress().then((user) => setUser(user))
    }
  }, [signer])

  useEffect(() => {
    if (provider) {
      console.log({ provider })
    }
  }, [provider])

  return (
    <div>
      <div className="my-6">
        <h2 className="font-semibold">
          Login to Web3 using your Google Account.
        </h2>
      </div>
      <button
        className="flex items-center gap-x-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleConnect}
      >
        <GoogleFill />
        Login with Google
      </button>
    </div>
  )
}

export default ConnectArcana
