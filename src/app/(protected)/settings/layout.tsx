import SettingsSidebar from '@/components/organism/SettingsSideBar'
import { cn } from '@/utils/shadcn.utils'
import React from 'react'

function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={cn(' h-full flex ')}>
            <SettingsSidebar></SettingsSidebar>
            <div className='mx-auto h-full flex-1 flex flex-col '>
                    {children}
            </div>
        </main>
    )
}

export default SettingsLayout
