import { TICKET_IMAGE_URL } from '../../constants'

const TicketFinal = () => {
  return (
    <div className="bg-red mt-16">
      {/* <h3 className="text-3xl font-medium">Ticket</h3> */}
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
            <button className="rounded-lg bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-900">
              Generate QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketFinal
