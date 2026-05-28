// "use client"
// import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
// import { useAppSelector } from '@/store/base.store';
// import { useRouter, usePathname } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// function AuthRouteGuard({ children }: { children: React.ReactNode }) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const [isHydrated, setIsHydrated] = useState(false);

//     const jwtToken = useAppSelector((state) => state.authentication.authentication);
//     const user = useAppSelector((state) => state.user.user);

//     useEffect(() => {
//         setIsHydrated(true);
//     }, []);

//     useEffect(() => {
//         if (!isHydrated) return;

//         if (jwtToken && user ) {
//             router.replace("/publication");        
//         } 
//         else if (!user && pathname.includes("reset-password")) {
//             router.replace("/forget-password");
//         }
//         else if (!user && pathname.includes("verify-email")) {
//             router.replace("/sign-up");     
//         }
//     }, [isHydrated, jwtToken, user, pathname, router]);

//     if (!isHydrated) return <RouteGuardSkeleton />;

//     if (jwtToken && user) return <RouteGuardSkeleton />;                        // waiting for redirect to /publication

//     if (!user && pathname.includes("reset-password")) return <RouteGuardSkeleton />; // waiting for redirect to /forget-password

//     return <>{children}</>;
// }

// export default AuthRouteGuard;