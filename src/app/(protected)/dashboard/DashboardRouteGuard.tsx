"use client"
import { ProductManagementPage } from "@/features/dashboard/components/templates/ProductManagementPage";
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import { useHydratedAuth } from '@/utils/routeGuard.utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function DashboardRouteGuard({children}:{children:React.ReactNode}){
    const router = useRouter();
    const { isHydrated, user } = useHydratedAuth();
    useEffect(() => {
        if (!isHydrated) return;

        if (user?.role==="USER") {
            router.replace("/shop");
        }
    }, [isHydrated, user, router]);

    if (!isHydrated) return <RouteGuardSkeleton />;
    if (user?.role === "USER") return <RouteGuardSkeleton></RouteGuardSkeleton>
    

    return <>{children}</>;
}