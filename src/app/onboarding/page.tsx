"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import { useAppSelector } from '@/store/base.store';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'; import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
import OnboardingProcessPage from "@/features/onboarding/components/templates/OnboardingProcessPage";

function page() {
    // const router = useRouter();
    // const pathname = usePathname();
    // const [isHydrated, setIsHydrated] = useState(false);

    // const jwtToken = useAppSelector((state) => state.authentication.authentication);
    // const user = useAppSelector((state) => state.user.user);

    // useEffect(() => {
    //     setIsHydrated(true);
    // }, []);

    // useEffect(() => {
    //     if (!isHydrated) return;
    //     if(!jwtToken || !user){
    //         router.replace("/sign-up");
    //     }
    //     else if (jwtToken && user && !user.isVerified) {
    //         router.replace("/verify-email");
    //     }
    //     else if (jwtToken && user && user.isVerified && user.isOnboardingCompleted) {
    //         router.replace("/publication");
    //     }
    // }, [isHydrated, jwtToken, user, pathname, router]);

    // if (!isHydrated) return <RouteGuardSkeleton />;

    // if (jwtToken && user) return <RouteGuardSkeleton />;                        // waiting for redirect to /publication

    // if (!user && pathname.includes("reset-password")) return <RouteGuardSkeleton />;                 // waiting for redirect to /publication
    
    return (
        <main className={cn(' min-h-screen bg-auth-gradient relative px-[280px] py-[44px]')}>
            <Image
                src={'/auth/auth-bck.png'}
                fill
                alt='bck'
                className='absolute top-0 left-0 z-0 object-cover opacity-30'
            ></Image>
            <div className='relative z-10'>
                <OnboardingProcessPage></OnboardingProcessPage>
            </div>
        </main>
    )
}

export default page
