import React, { Fragment, useEffect } from 'react'
import Portal from './Portal'

interface props {
  onCancel: (any) => void
  discription: string
}

const Modal = ({ onCancel }: props) => {
  return (
    <Fragment>
      <div onClick={onCancel} className="fixed inset-0 bg-black opacity-50" />
      <Portal>
        <div className="relative min-h-screen px-4 md:flex md:items-center md:justify-center">
          <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-25" />
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 md:relative md:mx-auto md:max-w-md">
            <div className="items-center md:flex">
              <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-gray-300">
                <i className="bx bx-error text-3xl" />
              </div>
              <div className="mt-4 text-center md:mt-0 md:ml-6 md:text-left">
                <p className="font-bold">Delete your account</p>
                <p className="mt-1 text-sm text-gray-700">
                  You will lose all of your data by deleting your account. This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-4 text-center md:flex md:justify-end md:text-right">
              <button className="block w-full rounded-lg bg-red-200 px-4 py-3 text-sm font-semibold text-red-700 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2">
                Delete Account
              </button>
              <button
                className="mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold md:order-1 md:mt-0 md:inline-block md:w-auto md:py-2"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </Fragment>
  )
}

export default Modal
