"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import OnboardingProcessPage from "@/features/onboarding/components/templates/OnboardingProcessPage";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { resolveRedirect, useHydratedAuth } from "@/utils/routeGuard.utils";

export default function OnboardingRouteGuard() { 
        const router = useRouter();
        const { isHydrated, jwt, user } = useHydratedAuth();

        useEffect(() => {
            if (!isHydrated) return;

            if (user && user.isOnboardingCompleted) {
                router.replace("/publication");
                return;
            }

            const redirect = resolveRedirect(user, jwt);
            if (redirect && redirect !== "/onboarding") {
                router.replace(redirect);
            }
        }, [isHydrated, jwt, user, router]);

        if (!isHydrated) return <RouteGuardSkeleton />;

        if (user?.isOnboardingCompleted) return <RouteGuardSkeleton />;

        const redirect = resolveRedirect(user, jwt);
        if (redirect && redirect !== "/onboarding") return <RouteGuardSkeleton />;

  
    return <OnboardingProcessPage></OnboardingProcessPage>
}

