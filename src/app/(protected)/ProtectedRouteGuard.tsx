// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/store/base.store";
// import RouteGuardSkeleton from "@/components/atoms/RouteGuardSkeleton";



// export default function ProtectedRouteGuard({ children }: { children: React.ReactNode; }) {
//     const router = useRouter();
//     const [isHydrated, setIsHydrated] = useState(false);

//     const jwtToken = useAppSelector((state) => state.authentication.authentication);
//     const user = useAppSelector((state) => state.user.user);

//     useEffect(() => {
//         setIsHydrated(true);
//     }, []);

//     useEffect(() => {
//         if (!isHydrated) return;
//         if (!jwtToken || !user) {
//             router.replace("/sign-in");
//         }
//         if(!user?.isVerified){
//             router.replace("/verify-email")
//         }
//         if(!user?.isOnboardingCompleted){
//             router.replace("/onboarding")
//         }
//     }, [isHydrated, jwtToken, user, router]);

//     if (!isHydrated) {
//         return <RouteGuardSkeleton />;
//     }

//     if (jwtToken && user) {
//         return <>{children}</>;
//     }

//     return <RouteGuardSkeleton />;
// }

