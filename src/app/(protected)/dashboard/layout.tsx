import DashboardSideBar from '@/components/organism/DashboardSideBar'
import { cn } from '@/utils/shadcn.utils'
import React from 'react'
import DashboardRouteGuard from './DashboardRouteGuard'

function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardRouteGuard>
        <main className={cn(' h-full flex ')}>
            <DashboardSideBar></DashboardSideBar>
            <div className='mx-auto h-full flex-1 '>
                {children}
            </div>
        </main>
        </DashboardRouteGuard>
    )
}

export default DashboardLayout
