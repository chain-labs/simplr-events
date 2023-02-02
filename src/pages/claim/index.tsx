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
      flex
      container
      bg-yellow-200
      text-black
      font-bold
      h-screen 
      items-center
      justify-center
    "
    >
      <div className="text text-center text-4xl underline ">Hello Men!</div>
    </div>
  )
}

export default ClaimPage
