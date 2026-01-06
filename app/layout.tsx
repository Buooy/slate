import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Slate - Curated Video Picks',
  description: 'Your daily dose of curated, insightful videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
