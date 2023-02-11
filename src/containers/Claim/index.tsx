import React, { useEffect } from 'react'
import { ARCANA_APP_ADDRESS, LOGO_URL } from '@/utils/constants'
import Image from 'next/image'
import TicketClaimSection from './TicketClaimSection'
import { QueryProps } from './types'
import { ProvideAuth } from '@arcana/auth-react'
import { AuthProvider, CHAIN } from '@arcana/auth'

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

const ClaimComponent = ({ query }: { query: QueryProps }) => {
  return (
    <div
      className={`
        bg-
        flex
        min-h-screen
        w-screen
        flex-col
        bg-slate-200
        `}
    >
      <ProvideAuth provider={provider}>
        <div className="container flex justify-between bg-white py-6 px-1 shadow-md sm:px-0">
          <div className="relative h-6 w-28 overflow-x-visible sm:h-8">
            <Image
              src={LOGO_URL}
              fill
              alt="logo image"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <TicketClaimSection query={query} />
      </ProvideAuth>
    </div>
  )
}

export default ClaimComponent
