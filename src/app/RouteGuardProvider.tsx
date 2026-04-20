"use client"
import { UserAppModel } from '@/features/user/types/user.types'
import { useAppSelector } from '@/store/base.store'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'


function RouteGuardProvider({ children }: { children: ReactNode }) {
    const { user } = useAppSelector(state => state.user)
    const pathName = usePathname()
    const router = useRouter()
    const [ready, setReady] = useState(false)
    

    function resolveRoutesBasedOnUserState(user: UserAppModel | null): string[] {
        // there is no user object so the user never interact with the app 
        if (!user) return ["/", "/sign-up", "/sign-in", "/forget-password","/shop","/dashboard/order-management"]     
        // there is a user object but it is still logged out ,this commes in case of forget-password route 
        if (user.isLoggedOut) return ["/reset-password","/sign-up", "/sign-in","/forget-password"]
        // here the user is officialy logged in       
        if (!user.isVerified) return ["/verify-email", "/sign-up"]
        if (!user.isOnboardingCompleted) return ["/onboarding"]
        return ["/home"]
        
    }
    useEffect(() => {
        const allowedRoutes = resolveRoutesBasedOnUserState(user)
        
        const redirectTarget = allowedRoutes[0]
        if (allowedRoutes.some(route => pathName === route || pathName.startsWith(route + "/"))) {            
            setReady(true)
        } else {
            router.replace(redirectTarget)
        }
    }, [pathName, router, user])

    if (!ready) return <div>Loading...</div>

    return (
        <>
            {children}
        </>
    )
}

export default RouteGuardProvider
