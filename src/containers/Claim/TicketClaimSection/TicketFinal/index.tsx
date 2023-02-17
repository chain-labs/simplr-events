import { client } from '@/components/ApolloClient'
import FETCH_HOLDER_TICKETS from '@/graphql/query/fetchHolderTickets'
import FETCH_REVEALED from '@/graphql/query/fetchRevealed'
import { CONTRACT_ADDRESS } from '@/utils/constants'
import { useAuth } from '@arcana/auth-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'
import { TICKET_IMAGE_URL } from '../../constants'
import QRCodeComp from './QRCodeComp'

const TicketFinal = ({ qrData }: { qrData: any }) => {
  const [generatingQR, setGeneratingQR] = useState(false)

  const [revealed, setRevealed] = useState<boolean>(false)
  const [ticketURI, setTicketURI] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [loading, setLoading] = useState(true)
  const auth = useAuth()

  const fetchRevealed = async () => {
    const tokenIdRes = await client.query({
      query: FETCH_HOLDER_TICKETS,
      variables: {
        id: auth.user.address,
        first: 1,
      },
    })
    const tokenId = tokenIdRes.data?.holders[0]?.tickets[0].tokenId
    setTokenId(tokenId)
    const res = await client.query({
      query: FETCH_REVEALED,
      variables: { address: CONTRACT_ADDRESS },
    })

    const { data } = res
    const isRevealed = !!data?.simplrEvents?.[0]?.isRevealed
    const ticketURI = data?.simplrEvents?.[0]?.ticketURI
    const ticketCid = ticketURI?.split('//')[1]
    const ticketImgRes = await axios.get(
      `https://nftstorage.link/ipfs/${ticketCid}${
        isRevealed ? `${tokenId}.json` : ''
      }`,
    )
    const ticketImg = `https://nftstorage.link/ipfs/${
      ticketImgRes.data?.image.split('//')[1]
    }`
    setTicketURI(ticketImg)
    setRevealed(isRevealed)
  }

  useEffect(() => {
    fetchRevealed().then(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="mt-40 h-16 w-16">
        <Spinner />
      </div>
    )
  }

  if (!generatingQR) {
    return (
      <div className="bg-red mt-16">
        <div className="rounded-xl bg-slate-200 py-4 shadow-xl">
          <div className="w-full py-8">
            <img src={ticketURI} alt="ticket image" className="object-cover" />
          </div>
          <div className="w-full border-t border-t-gray-300 pt-4">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
              Your Vivacity 2023 Ticket
            </h2>
            <div className="mt-6 mb-8 flex justify-center gap-4">
              <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">
                Join Telegram
              </button>
              <button
                className="rounded-lg bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
                onClick={() => setGeneratingQR(true)}
              >
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <QRCodeComp {...{ qrData, tokenId }} />
  }
}

export default TicketFinal
