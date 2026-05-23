// "use client"
// import { UserAppModel } from '@/features/user/types/user.types'
// import { useAppSelector } from '@/store/base.store'
// import { usePathname,useRouter } from 'next/navigation'
// import React, { ReactNode, useEffect, useState } from 'react'


// function RouteGuardProvider({ children }: { children: ReactNode }) {
//     const { user } = useAppSelector(state => state.user)    
//     const pathName = usePathname()
//     const router = useRouter()
//     const [ready, setReady] = useState<boolean>(false)
    

//     function getAllowedRoutesBasedOnUserState(user: UserAppModel | null): string[] {
//         // there is no user object so the user never interact with the app 
//         if (!user) return ["/", "/sign-up", "/sign-in", "/forget-password"]  

//         // there is a user object but it is still logged out ,this commes in case of forget-password route 
//         if (user.isLoggedOut) return ["/reset-password", "/sign-up", "/sign-in", "/forget-password"]
//         // here the user is officialy logged in       
//         if (!user.isVerified) return ["/verify-email","sign-up"]
//         if (!user.isOnboardingCompleted) return ["/onboarding"]
//         return ["/home","/settings"]  
//     }

//     useEffect(() => {
//             const allowedRoutes = getAllowedRoutesBasedOnUserState(user);
//             const isAllowed = allowedRoutes.some(route => pathName === route || pathName.startsWith(route + "/"));
//             const redirectTarget = allowedRoutes[0];
//             if (!isAllowed && pathName !== redirectTarget) {
//                 router.replace(redirectTarget);
//             } else {
//                 setReady(true);
//             }
        
//     }, [pathName]);



//     if (!ready) return <div>Loading...</div>

//     return (
//         <>
//             {children}
//         </>
//     )
// }

// export default RouteGuardProvider
