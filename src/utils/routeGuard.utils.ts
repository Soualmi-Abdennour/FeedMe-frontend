"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/base.store";
import { authStateModel } from "@/features/auth/types/auth.types";
import { UserAppModel } from "@/features/user/types/user.types";


export function resolveRedirect(
    user: UserAppModel | null,
    jwt: string | undefined
): string | null {
    if (!user) {
        return "/sign-in";
    }

    if (!user.isVerified) {
        return "/verify-email";
    }

    if (!jwt) {
        return "/sign-in";
    }

    if (!user.isOnboardingCompleted) {
        return "/onboarding";
    }

    return null; // fully authenticated and onboarded
}





export function useHydratedAuth() {
    const [isHydrated, setIsHydrated] = useState(false);

    const jwt = useAppSelector((state) => state.authentication.authentication?.jwtToken);
    const user = useAppSelector((state) => state.user.user);
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return { isHydrated,jwt , user };
}