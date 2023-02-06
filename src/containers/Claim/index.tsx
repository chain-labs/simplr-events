import React from 'react'
import { LOGO_URL } from '@/utils/constants'
import Image from 'next/image'
import TicketClaimSection from './TicketClaimSection'
import { QueryProps } from './types'

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
    </div>
  )
}

export default ClaimComponent
