import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
import AppSidebar from '@/components/organism/AppSideBar'
import AppHeader from '@/components/organism/AppHeader'
interface Props { }

function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={cn('min-h-screen relative')}>
            <AppSidebar />
            <div className='pl-20 bg-primary-50 h-screen flex flex-col'>
                <AppHeader />
                <div className='flex-1 mt-3 overflow-y-auto'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default ProtectedLayout
