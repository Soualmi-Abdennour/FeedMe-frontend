import SettingsSidebar from '@/components/organism/SettingsSideBar'
import { cn } from '@/utils/shadcn.utils'
import React from 'react'

function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={cn(' min-h-screen flex ')}>
            <SettingsSidebar></SettingsSidebar>
            <div className='mx-auto    flex-1 py-10'>
                {children}
            </div>
        </main>
    )
}

export default SettingsLayout
