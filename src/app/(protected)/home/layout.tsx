import AppSidebar from '@/components/organism/AppSideBar'
import React from 'react'


function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen'>
            <AppSidebar></AppSidebar>
            <main className='flex-1 flex flex-col items-center overflow-y-scroll h-full border-2 border-blue-800'>
                {children}
            </main>
        </div>
    )
}

export default Layout
