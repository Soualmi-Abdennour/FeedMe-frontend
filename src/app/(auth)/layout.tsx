import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
// import AuthRouteGuard from './AuthRouteGuard'
interface Props { }

function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <AuthRouteGuard>
            <main className={cn(' min-h-screen bg-auth-gradient relative')}>
                <Image
                    src={'/auth/auth-bck.png'}
                    fill
                    alt='bck'
                    className='absolute top-0 left-0 z-0 object-cover opacity-30'
                ></Image>
                <div className='relative z-10'>
                    {children}
                </div>
            </main>
        // </AuthRouteGuard>
    )
}

export default AuthLayout
