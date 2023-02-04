import Wagmi from '../../components/Wagmi'
import React from 'react'
import { wrapper } from '@/redux/store'

const AdminPage = () => {
  return (
    <Wagmi>
      <div className="container flex h-screen items-center justify-center bg-yellow-200 font-bold text-black">
        <div className="text text-center text-4xl underline">Hello</div>
      </div>
    </Wagmi>
  )
}

export default wrapper.withRedux(AdminPage)
