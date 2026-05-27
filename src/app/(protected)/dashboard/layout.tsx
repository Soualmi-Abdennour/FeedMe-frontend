import DashboardSideBar from '@/components/organism/DashboardSideBar'
import { cn } from '@/utils/shadcn.utils'
import React from 'react'

function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={cn(' h-full flex ')}>
            <DashboardSideBar></DashboardSideBar>
            <div className='mx-auto h-full flex-1 '>
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout
