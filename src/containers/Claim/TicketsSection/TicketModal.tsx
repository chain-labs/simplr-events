import If from '@/components/If'
import { CircleXFill, TelegramFill, TwitterFill } from 'akar-icons'
import React, { useState } from 'react'
import { TICKET_IMAGE_URL } from '../constants'
import QRCodeContent from './QRCodeContent'

interface Props {
  modalData: any
  setModalOpen: (boolean) => void
  setModalData: (any) => void
}

const TicketModal = ({ setModalOpen, modalData, setModalData }: Props) => {
  const [generatingQR, setGeneratingQR] = useState(false)

  return (
    <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-modal-bg">
      <div className="absolute top-0 h-1/2 w-full rounded-b-lg bg-gray-200 pt-4">
        <If
          condition={!generatingQR}
          then={
            <React.Fragment>
              <div
                className="float-right pr-4"
                onClick={() => {
                  setModalOpen(false)
                  setModalData({})
                }}
              >
                <CircleXFill size={24} />
              </div>
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
                    {`#${modalData?.tokenId} ${modalData?.eventName}`}
                  </h2>
                  <div className="mt-6 flex justify-center gap-4">
                    <button className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                      <TelegramFill size={16} />
                      <h4 className="ml-2 text-sm">Join Telegram</h4>
                    </button>
                    <button className="focus:bg-initial flex items-center rounded-lg bg-[#1da1f2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1da1f2]">
                      <TwitterFill size={16} />
                      <h4 className="ml-2 text-sm">Share on Twitter</h4>
                    </button>
                  </div>
                  <div className="mt-4 mb-6 flex justify-center gap-4">
                    <button
                      className="flex items-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white  hover:bg-emerald-700 focus:bg-emerald-500"
                      onClick={() => setGeneratingQR(true)}
                    >
                      <h4 className="text-sm">Generate QR Code</h4>
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
          else={<QRCodeContent modalData={modalData} />}
        />
      </div>
    </div>
  )
}

export default TicketModal
