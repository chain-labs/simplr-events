import React from 'react'
import ConnectWallet from './ConnectWallet'

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white px-2 py-2.5 dark:border-gray-600 dark:bg-gray-900 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://ik.imagekit.io/chainlabs/Simplr_Collection_Dapp/simplr-logo__v0Tmlq6M.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675703009631"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            ></img>
            {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              VivaCity 2023
            </span> */}
          </div>
          <div className="flex md:order-2">
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
