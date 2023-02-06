import React, { useEffect, useState } from 'react'
import { useAuth } from '@arcana/auth-react'
import { ethers, providers } from 'ethers'
import { ArrowCycle, ChevronRight, GoogleFill } from 'akar-icons'
import If from '@/components/If'
import { STEPS } from '../constants'
import Image from 'next/image'

const ConnectArcana = ({ setStep }: { setStep: (number) => void }) => {
  const auth = useAuth()

  const [provider, setProvider] = useState<providers.Web3Provider>()
  const [signer, setSigner] = useState<providers.JsonRpcSigner>()
  const [user, setUser] = useState<string>()
  const [loggingIn, setLoggingIn] = useState(false)

  const handleConnect = async (e) => {
    e.preventDefault()
    setLoggingIn(true)
    const arcanaProvider = await auth.loginWithSocial('google')
    const provider = new ethers.providers.Web3Provider(arcanaProvider)
    const signer = provider.getSigner()
    setSigner(signer)
    setProvider(provider)
  }

  const handleLogout = () => {
    auth.logout()
    setProvider(null)
    setSigner(null)
    setUser('')
  }

  useEffect(() => {
    auth.logout()
  }, [])

  useEffect(() => {
    if (signer) {
      signer.getAddress().then((user) => setUser(user))
    }
  }, [signer])

  useEffect(() => {
    if (user) {
      setLoggingIn(false)
    }
  }, [user])

  return (
    <div>
      <div className="my-6">
        <h2 className="font-semibold">
          Login to Web3 using your Google Account.
        </h2>
      </div>
      <If
        condition={!user}
        then={
          <If
            condition={!loggingIn}
            then={
              <button
                className="flex items-center gap-x-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={handleConnect}
              >
                <GoogleFill />
                Login with Google
              </button>
            }
            else={
              <button
                className="flex items-center gap-x-4 rounded-full bg-blue-300 py-2 px-4 font-bold text-white"
                disabled
              >
                <div className="animate-spin-slow">
                  <ArrowCycle strokeWidth={2} size={18} />
                </div>
                Signing In
              </button>
            }
          />
        }
        else={
          <div>
            <div className="mt-4">
              <div className="text-lg font-bold">
                <span className="flex items-center rounded-full border bg-gray-200 px-4 py-2 text-sm font-semibold">
                  <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
                    <Image src={auth?.user?.picture} fill alt="pfp" />
                  </div>
                  {auth?.user?.email}
                </span>
              </div>
              <p className="float-right mr-2 text-sm font-medium">
                Not You?{' '}
                <button
                  className="text-red-400 underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </p>
            </div>
            {/* <div className="text-sm">Wallet Address: {auth?.user?.picture}</div> */}
            <button
              className="mt-10 flex items-center gap-x-1 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"
              onClick={() => setStep(STEPS.ENCRYPT_DATA)}
            >
              Proceed
              <div className="animate-bounce-right">
                <ChevronRight size={18} />
              </div>
            </button>
          </div>
        }
      />
    </div>
  )
}

export default ConnectArcana
