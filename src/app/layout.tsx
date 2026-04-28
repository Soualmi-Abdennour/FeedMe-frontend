
import { cn } from "@/utils/shadcn.utils";



import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore 
import './globals.css'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "FeedMe",
  description: "A Dz food community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
        )}
      >
        <StoreProvider>
          <div>
            {children}
          </div>
          <Toaster position='bottom-right'></Toaster>
        </StoreProvider>
      </body>
    </html>
  );
}
