
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore 
import "./globals.css"
import StoreProvider from './StoreProvider'
import RouteGuardProvider from './RouteGuardProvider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FeedMe',
  description: 'Food community app for Algeria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <StoreProvider>
          {/* <RouteGuardProvider> */}
          <div>
            {children}
          </div>
          <Toaster position='bottom-right'></Toaster>
          {/* </RouteGuardProvider> */}
        </StoreProvider>
      </body>
    </html>
  )
}
