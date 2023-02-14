import { client } from '@/components/ApolloClient'
import If from '@/components/If'
import FETCH_HOLDER_TICKETS from '@/graphql/query/fetchHolderTickets'
import { useAuth } from '@arcana/auth-react'
import {
  CirclePlusFill,
  CircleXFill,
  TelegramFill,
  TwitterFill,
} from 'akar-icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TICKET_IMAGE_URL } from '../constants'
import TicketModal from './TicketModal'

const LoggedIn = () => {
  const [userTickets, setUserTickets] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  const auth = useAuth()

  const getHolderTickets = async (address) => {
    const res = await client.query({
      query: FETCH_HOLDER_TICKETS,
      variables: {
        id: address,
      },
    })
    console.log({ res: res.data?.holders[0]?.tickets })
    const tickets = res.data?.holders[0]?.tickets
    setUserTickets(tickets)
  }

  useEffect(() => {
    if (auth.user?.address) {
      getHolderTickets(auth.user.address)
    }
  }, [auth.user])

  useEffect(() => {
    if (typeof window != undefined) {
      if (modalOpen) document.querySelector('html').style.overflow = 'hidden'
      else document.querySelector('html').style.overflow = 'auto'
    }
  }, [modalOpen])

  return (
    <div className="px-4 text-black">
      <If
        condition={modalOpen}
        then={<TicketModal {...{ modalData, setModalData, setModalOpen }} />}
      />
      <h2 className="mt-4 mb-4 text-3xl font-semibold">Your Tickets</h2>
      <div className="grid max-h-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-slate-400 ">
          <CirclePlusFill strokeWidth={2} size={48} />
          <h4 className="mt-4 text-sm font-medium">Claim a Ticket</h4>
        </div>
        {userTickets.map((ticket) => {
          return (
            <div
              className="w-full rounded-md border border-slate-300 bg-gray-100 py-4"
              key={ticket.dataCid}
              onClick={() => {
                setModalOpen(true)
                setModalData({
                  dataCid: ticket?.dataCid,
                  tokenId: ticket?.tokenId,
                  eventName: ticket?.simplrEvent?.name,
                })
              }}
            >
              <div className="relative mb-4 h-24 w-full md:h-32 lg:h-48">
                <Image
                  src={TICKET_IMAGE_URL}
                  fill
                  alt="ticket_img"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-md px-4 font-semibold">{`#${ticket.tokenId} ${ticket?.simplrEvent?.name}`}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LoggedIn
