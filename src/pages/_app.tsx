import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { debounce } from 'lodash'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Set a custom CSS Property for Height
    // See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    if (process.browser) {
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      const handleResize = debounce(() => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }, 150)

      window.addEventListener('resize', handleResize)
      return () => {
        if (process.browser) {
          window.removeEventListener('resize', handleResize)
        }
      }
    }
  })
  return (
    <>
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,300,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
