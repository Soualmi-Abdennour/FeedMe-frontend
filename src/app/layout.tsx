
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore 
import "./globals.css"
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/utils/shadcn.utils'
import StoreProvider from './StoreProvider'


const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'FeedMe',
  description: 'Food community app for Algeria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,`min-h-screen ` )}>
        <StoreProvider>
          <div>
            {children}
          </div>
          <Toaster position='bottom-right'></Toaster>
        </StoreProvider>
      </body>
    </html>
  )
}
