import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,300,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="https://ik.imagekit.io/chainlabs/Simplr_Collection_Dapp/Simplr_Dark_Logo__kMoJpXxz.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1676563761000"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
