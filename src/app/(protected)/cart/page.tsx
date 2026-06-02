
"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import CartPage from '../../../features/cart/components/template/CartPage';
import { useRouter } from 'next/navigation';
import { useHydratedAuth } from '@/utils/routeGuard.utils';
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
    if (user?.role === "RESTAURANT") return <RouteGuardSkeleton/>
    if (!isHydrated) return <RouteGuardSkeleton />;

    

    return <CartPage></CartPage>;
}