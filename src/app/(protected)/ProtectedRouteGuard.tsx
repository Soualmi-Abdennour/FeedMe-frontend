"use client";

import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";
import { useHydratedAuth } from "@/utils/routeGuard.utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isHydrated, jwt, user } = useHydratedAuth();

    useEffect(() => {
        if (!isHydrated) return;

        if(!user || !jwt) {
            router.replace("/sign-in")
            return
        }
        if(user && jwt && !user.isOnboardingCompleted) {
            router.replace("/onboarding")
            return
        }
    }, [isHydrated, jwt, user, router]);

    if (!isHydrated) return <RouteGuardSkeleton />;

    if (!user || !jwt) return <RouteGuardSkeleton />;
    if (user && jwt && !user.isOnboardingCompleted) return <RouteGuardSkeleton />;

    return <>{children}</>;
}