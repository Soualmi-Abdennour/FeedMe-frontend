"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";
import { useHydratedAuth, resolveRedirect } from "@/utils/routeGuard.utils";


export default function AuthRouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isHydrated, jwt, user } = useHydratedAuth();

    useEffect(() => {
        if (!isHydrated) return;

        if (user && jwt  && user.isOnboardingCompleted) {
            router.replace("/publication");
            return;
        }

        if (user && jwt && !user.isOnboardingCompleted) {
            router.replace("/onboarding");
            return
        }
    }, [isHydrated, jwt, user, router]);

    if (!isHydrated) return <RouteGuardSkeleton />;

    if (user && jwt &&  user.isOnboardingCompleted) return <RouteGuardSkeleton />;
    if (user && jwt && !user.isOnboardingCompleted) return <RouteGuardSkeleton />;

    return <>{children}</>;
}