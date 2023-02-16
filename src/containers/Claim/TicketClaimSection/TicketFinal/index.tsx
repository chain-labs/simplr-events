import { client } from '@/components/ApolloClient'
import FETCH_REVEALED from '@/graphql/query/fetchRevealed'
import { CONTRACT_ADDRESS } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { TICKET_IMAGE_URL } from '../../constants'
import QRCodeComp from './QRCodeComp'

const TicketFinal = ({ qrData }: { qrData: any }) => {
  const [generatingQR, setGeneratingQR] = useState(false)

  const [revealed, setRevealed] = useState(false)

  const fetchRevealed = async () => {
    const res = await client.query({
      query: FETCH_REVEALED,
      variables: { address: CONTRACT_ADDRESS },
    })

    const { data } = res
    const isRevealed = !!data?.simplrEvents?.[0]?.isRevealed
    setRevealed(isRevealed)
  }

  useEffect(() => {
    fetchRevealed()
  }, [])

  if (!generatingQR) {
    return (
      <div className="bg-red mt-16">
        <div className="rounded-xl bg-slate-200 py-4 shadow-xl">
          <div className="w-full py-8">
            <img
              src={TICKET_IMAGE_URL}
              alt="ticket image"
              className="object-cover"
            />
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
    return <QRCodeComp {...{ qrData }} />
  }
}

export default TicketFinal
