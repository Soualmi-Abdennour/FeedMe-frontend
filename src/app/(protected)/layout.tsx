import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
import AppSidebar from '@/components/organism/AppSideBar'
interface Props { }

function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={cn(' min-h-screen  relative ')}>
            <AppSidebar></AppSidebar>
            <div className='pl-16 bg-primary-50 h-screen'>
                {children}
            </div>
        </main>
    )
}

export default ProtectedLayout
