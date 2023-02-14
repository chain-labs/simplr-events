import { client } from '@/components/ApolloClient'
import If from '@/components/If'
import FETCH_HOLDER_TICKETS from '@/graphql/query/fetchHolderTickets'
import { useAuth } from '@arcana/auth-react'
import { CirclePlusFill, GoogleFill } from 'akar-icons'
import { ethers } from 'ethers'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TICKET_IMAGE_URL } from '../constants'
import LoggedIn from './LoggedIn'

const TicketsSection = () => {
  const auth = useAuth()
  const [loggingIn, setLoggingIn] = useState(false)
  const [initial, setInitial] = useState(true)

  const handleConnect = async (e) => {
    e.preventDefault()
    setInitial(false)
    setLoggingIn(true)
    const arcanaProvider = await auth.loginWithSocial('google')
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      if (initial) {
        auth.logout()
      }
    }
  }, [auth.isLoggedIn])

  if (auth.isLoggedIn) {
    return <LoggedIn />
  } else
    return (
      <div className="flex h-3/4 flex-1 items-center justify-center">
        <button
          className="flex items-center gap-x-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white disabled:bg-gray-500"
          onClick={handleConnect}
          disabled={loggingIn}
        >
          <If
            condition={!loggingIn}
            then={
              <React.Fragment>
                <GoogleFill />
                Login with Google
              </React.Fragment>
            }
            else="Logging In"
          />
        </button>
      </div>
    )
}

export default TicketsSection
