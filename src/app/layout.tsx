
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
// @ts-ignore 
import "./globals.css"
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/utils/shadcn.utils'
import StoreProvider from './StoreProvider'


const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'FeedMe',
  description: 'Food community app for Algeria',
  icons:{
    icon:"/FeedMeOrange.svg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,`min-h-screen bg-primary-50` )}>
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
