"use client";

import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";
import VerifyEmailTokenPage from "@/features/auth/components/templates/VerifyEmailTokenPage";
import { useHydratedAuth } from "@/utils/routeGuard.utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function VerifyEmailRouteGuard() {
    console.log("HHHHHHHHHHH");

    const router = useRouter();
    const params = useSearchParams()
    const token = params.get("token")
    const identifier = params.get("identifier")
    const {isHydrated,jwt,user}=useHydratedAuth()
    useEffect(()=>{
        
        if(token && !identifier){
            router.replace("/sign-up")
            return
        }
        if (!identifier ){
            router.replace("/sign-up")
            return
        }

        if (!isHydrated) return;

        if(jwt && user && user.isOnboardingCompleted){
            router.replace("/publication")
            return
        }
        if(jwt && user && !user.isOnboardingCompleted){
            router.replace("/onboarding")
            return
        }
    },[router,token,isHydrated,jwt,user,identifier])

    if (!identifier) return <RouteGuardSkeleton />; 
    if (token && !identifier) return <RouteGuardSkeleton />; 
    if (!isHydrated) return <RouteGuardSkeleton/>;
    if (jwt && user && user.isOnboardingCompleted) return <RouteGuardSkeleton />
    if (jwt && user && !user.isOnboardingCompleted) return <RouteGuardSkeleton />

    return <VerifyEmailTokenPage identifier={identifier}></VerifyEmailTokenPage>;
}

