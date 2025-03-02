import type { Metadata } from "next";
import Script from "next/script";

import "simplebar-react/dist/simplebar.min.css";

import Wagmi from "@/components/providers/Wagmi";

import "./globals.css";

export const metadata: Metadata = {
  title: "simplr events",
  description: "A site to buy and sell tickets for events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}')
          `}
        </Script>
        <link
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=switzer@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900,901&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={"bg-simpleBlue font-switzer antialiased"}>
        <Wagmi>{children}</Wagmi>
      </body>
    </html>
  );
}
