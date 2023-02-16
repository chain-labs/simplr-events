import React, { useEffect, useState } from 'react'
import {
  ARCANA_APP_ADDRESS,
  CONTRACT_ADDRESS,
  LOGO_URL,
  TOKEN_NAME,
} from '@/utils/constants'
import Image from 'next/image'
import TicketClaimSection from './TicketClaimSection'
import { QueryProps } from './types'
import { ProvideAuth } from '@arcana/auth-react'
import { AuthProvider, CHAIN } from '@arcana/auth'
import If from '@/components/If'
import TicketsSection from './TicketsSection'
import { client } from '@/components/ApolloClient'
import FETCH_EVENT_NAME from '@/graphql/query/fetchEventName'

const provider = new AuthProvider(`${ARCANA_APP_ADDRESS}`, {
  position: 'right',
  theme: 'light',
  alwaysVisible: true,
  network: 'testnet',
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: '',
  },
})

const checkQuery = (query: QueryProps): boolean => {
  const { lastname, firstname, emailid, eventname, batchid } = query
  if (lastname && firstname && emailid && eventname && batchid) return true
  else return false
}

const ClaimComponent = ({ query }: { query: QueryProps }) => {
  return (
    <div
      className={`
      flex
      min-h-screen
      w-screen
      flex-col
      bg-slate-200
      `}
    >
      <ProvideAuth provider={provider}>
        <div className="flex flex-1 flex-col pb-6">
          <div className="container flex items-center justify-between bg-white py-1 px-1 shadow-md sm:px-0">
            <div className="relative h-6 w-28 overflow-x-visible sm:h-8">
              <Image
                src={LOGO_URL}
                fill
                alt="logo image"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="relative h-16 w-28 overflow-x-visible sm:h-8">
              <Image
                src="https://ik.imagekit.io/chainlabs/Simplr_Events/Vivacity_logo_avv4jkBIr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676590590305"
                fill
                alt="logo image"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="container mt-4 flex flex-1 flex-col border-l-4 border-l-emerald-400 bg-white pb-12 shadow-md">
            <div className="container px-4 py-6">
              <If
                condition={checkQuery(query)}
                then={
                  <h1 className="text-center text-3xl font-bold text-black">
                    Time to seize your digital bragging rights!
                  </h1>
                }
                else={
                  <h1 className="text-center text-5xl font-bold text-black">
                    Claim {TOKEN_NAME}
                  </h1>
                }
              />
            </div>
            <If
              condition={checkQuery(query)}
              then={<TicketClaimSection query={query} />}
              else={<TicketsSection />}
            />
          </div>
        </div>
      </ProvideAuth>
    </div>
  )
}

export default ClaimComponent
