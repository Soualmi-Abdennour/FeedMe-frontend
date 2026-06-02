"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import ShopPage from '@/features/shop/components/template/ShopPage';
import { useHydratedAuth } from '@/utils/routeGuard.utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Page(){
    const router = useRouter();
    const { isHydrated, user } = useHydratedAuth();
    useEffect(() => {
        if (!isHydrated) return;

        if (user?.role==="RESTAURANT") {
            router.replace("/dashboard/product-managment");
        }
    }, [isHydrated, user, router]);

    if (!isHydrated) return <RouteGuardSkeleton />;
    if (user?.role === "RESTAURANT") return <RouteGuardSkeleton />
    

    return <ShopPage></ShopPage>;
}