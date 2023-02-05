import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ClaimPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query) {
      console.log({ query: router.query })
    }
  }, [router.query])
  return (
    <div
      className="
      container
      flex
      h-screen
      items-center
      justify-center
      bg-yellow-200 
      font-bold
      text-black
    "
    >
      <div className="text text-center text-4xl underline ">Hello Men!</div>
    </div>
  )
}

export default ClaimPage
