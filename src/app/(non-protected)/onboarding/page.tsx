"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import AppHeader from '@/components/organism/AppHeader';
import { clearAuthState } from '@/features/auth/store/auth.slice';
import OnboardingProcessPage from "@/features/onboarding/components/templates/OnboardingProcessPage";
import { useHydratedAuth } from "@/utils/routeGuard.utils";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingRouteGuard() { 
        const router = useRouter();
        const { isHydrated, jwt, user } = useHydratedAuth();
        useEffect(() => {
            if (!isHydrated) return;

            if (user && jwt && user.isOnboardingCompleted) {
                router.replace("/publication");
                return;
            }

            if (!user || !jwt) {
                router.replace("/sign-in");
                return
            }
        }, [isHydrated, jwt, user, router]);

        if (!isHydrated) return <RouteGuardSkeleton />;

    if (user && jwt && user.isOnboardingCompleted) return <RouteGuardSkeleton />;

    if (!user || !jwt) return <RouteGuardSkeleton />;

  
    return (
        <div>
            <AppHeader></AppHeader>
        <OnboardingProcessPage></OnboardingProcessPage>
        </div>
    )
        
}

