// "use client"
// import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
// import ResetPasswordPage from "@/features/auth/components/templates/ResetPasswordPage";
// import { useAppSelector } from '@/store/base.store';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

import ResetPasswordPage from "@/features/auth/components/templates/ResetPasswordPage";



// function page() {
//     const router = useRouter();
//     const [isHydrated, setIsHydrated] = useState(false);

//     const jwtToken = useAppSelector((state) => state.authentication.authentication);
//     const user = useAppSelector((state) => state.user.user);

//     useEffect(() => {
//         setIsHydrated(true);
//     }, []);


//     useEffect(() => {
//         if (!isHydrated) return;

//         if (!user) {
//             router.replace("/forget-password"); 
//         }

//         if (jwtToken && user) {
//             router.replace("/publication"); 
//         }
//     }, [isHydrated, jwtToken, user, router]);


//     if (user && !jwtToken) {
//         return <ResetPasswordPage />; 
//     }

//     return <RouteGuardSkeleton />;
// }

// export default page

export default ResetPasswordPage