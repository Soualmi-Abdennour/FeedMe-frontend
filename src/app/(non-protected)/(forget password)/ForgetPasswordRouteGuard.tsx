"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";
import { useHydratedAuth, resolveRedirect } from "@/utils/routeGuard.utils";


export default function ForgetPasswordRouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams()
    const token = params.get("token")
    const verifiedToken=params.get("verifiedToken")
    const identifier = params.get("identifier")
    const { isHydrated, jwt, user } = useHydratedAuth();

    const isResetPage = pathname.includes("reset-password");

    useEffect(() => {
        if (!isHydrated) return;

        if (user && jwt && !user.isOnboardingCompleted) {
            router.replace("/onboarding");
            return;
        }
        if (user && jwt && user.isOnboardingCompleted) {
            router.replace("/publication");
            return;
        }
        if ((!token && !identifier && isResetPage) || (!verifiedToken && !identifier && isResetPage)  ) {
            router.replace("/forget-password")
            return
        }

        

    }, [isHydrated, jwt, user, isResetPage, router,token,verifiedToken,identifier]);

    if (!isHydrated) return <RouteGuardSkeleton />;
    if ((!token && !identifier && isResetPage) || (!verifiedToken && !identifier && isResetPage)) return <RouteGuardSkeleton />
    if (user && jwt && !user.isOnboardingCompleted) return <RouteGuardSkeleton />;
    if (user && jwt && user.isOnboardingCompleted) return <RouteGuardSkeleton />;

    return <>{children}</>;
}