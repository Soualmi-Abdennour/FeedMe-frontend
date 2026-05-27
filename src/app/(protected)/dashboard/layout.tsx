import DashboardSideBar from '@/components/organism/DashboardSideBar'
import { cn } from '@/utils/shadcn.utils'
import React from 'react'

function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={cn(' min-h-screen flex ')}>
            <DashboardSideBar></DashboardSideBar>
            <div className='mx-auto    flex-1 py-10'>
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout
