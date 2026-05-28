import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
import AppSidebar from '@/components/organism/AppSideBar'
import AppHeader from '@/components/organism/AppHeader'
// import ProtectedRouteGuard from './ProtectedRouteGuard'

function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <ProtectedRouteGuard>
            <main className={cn('h-screen relative z-0 ')}>
                <AppSidebar />
                <div className='pl-20 bg-primary-50 h-screen flex flex-col '>
                    <AppHeader />
                    <div className='flex-1 mt-3  h-[calc(100%-68px)]'>
                        {children}
                    </div>
                </div>
            </main>
        // </ProtectedRouteGuard>
    )
}

export default ProtectedLayout
