import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
import AppSidebar from '@/components/organism/AppSideBar'
import AppHeader from '@/components/organism/AppHeader'
import ProtectedRouteGuard from './ProtectedRouteGuard'

function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRouteGuard>
            <main className={cn('relative z-0 min-h-screen')}>
                <AppSidebar />
                <div className='pl-20 bg-primary-50  flex flex-col h-full'>
                    <AppHeader />
                    <div className='flex-1 mt-3  h-[calc(100%-68px)] '>
                        {children}
                    </div>
                </div>
            </main>
        </ProtectedRouteGuard>
    )
}

export default ProtectedLayout
