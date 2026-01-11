import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Slate - Curated Video Picks',
  description: 'Your daily dose of curated, insightful videos',
}

// Enable safe area insets for iOS notch/Dynamic Island
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
