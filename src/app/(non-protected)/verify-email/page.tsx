"use client";

import VerifyEmailTokenPage from "@/features/auth/components/templates/VerifyEmailTokenPage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";
import { useHydratedAuth, resolveRedirect } from "@/utils/routeGuard.utils";


export default function VerifyEmailRouteGuard() {
    const router = useRouter();
    const { isHydrated, jwt, user } = useHydratedAuth();

    useEffect(() => {
        if (!isHydrated) return;

        if (!user) {
            router.replace("/sign-up");
            return;
        }

        if (user.isVerified) {
            const redirect = resolveRedirect(user, jwt);
            router.replace(redirect ?? "/publication");
        }
    }, [isHydrated, jwt, user, router]);

    if (!isHydrated) return <RouteGuardSkeleton />;

    if (!user) return <RouteGuardSkeleton />; 
    if (user.isVerified) return <RouteGuardSkeleton />; 

    return <VerifyEmailTokenPage></VerifyEmailTokenPage>;
}

