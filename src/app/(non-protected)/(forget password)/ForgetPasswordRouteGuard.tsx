"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";
import { useHydratedAuth, resolveRedirect } from "@/utils/routeGuard.utils";


export default function ForgetPasswordRouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isHydrated, jwt, user } = useHydratedAuth();

    const isResetPage = pathname.includes("reset-password");

    useEffect(() => {
        if (!isHydrated) return;

        if (user && jwt && user.isVerified && user.isOnboardingCompleted) {
            router.replace("/publication");
            return;
        }

        if (isResetPage && !user) {
            router.replace("/forget-password");
            return;
        }

        if (isResetPage && user && jwt) {
            const redirect = resolveRedirect(user, jwt);
            if (redirect) router.replace(redirect);
        }
    }, [isHydrated, jwt, user, isResetPage, router]);

    if (!isHydrated) return <RouteGuardSkeleton />;

    if (user && jwt && user.isVerified && user.isOnboardingCompleted) return <RouteGuardSkeleton />;
    if (isResetPage && !user) return <RouteGuardSkeleton />;
    if (isResetPage && user && jwt) return <RouteGuardSkeleton />;

    return <>{children}</>;
}