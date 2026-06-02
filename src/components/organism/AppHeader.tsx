"use client"
import { useAppSelector } from '@/store/base.store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/features/auth/store/auth.api.slice';
import { clearUser } from '@/features/user/store/user.slice';
import { useAppDispatch } from '@/store/base.store';
import { ApiResponse } from '@/types/api.types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { clearAuthState } from '@/features/auth/store/auth.slice'

function AppHeader() {
    const { user } = useAppSelector(state => state.user)
    const router = useRouter()
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const handleLogout = async () => {
        const fetchResponse = await logout()
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: ApiResponse<null> = fetchResponse.data as ApiResponse<null>

        if (error) {
            const errorResponse = error.data as ApiResponse<null>
            if (!errorResponse || errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
            }
        }
        else {
            toast.success(successResponse.message)
            router.replace("/")
            setTimeout(() => {
                dispatch(clearUser())
                dispatch(clearAuthState())
            }, 1000);
        }
    }
    let profileImage
    if (user?.role === "USER")
        profileImage = user.profile?.userBasicInformation.profileImageUrl
    else
        profileImage = user?.profile?.restaurantBasicInformation.restaurantLogoUrl
    return (
        <header className='flex items-center justify-end gap-4 w-full bg-[#F8F8F8] shadow-[3px_4px_4px_0px_#00000040] h-14 px-3 z-40'>
            {user?.isOnboardingCompleted && user?.role === "USER" && <Link href={"/cart"}>
                <ShoppingCart size={24}></ShoppingCart>
            </Link>}
            {user?.isOnboardingCompleted && <Link href={"/profile"}>
                <div className='rounded-full size-8 '>
                    <Image
                        src={profileImage ?? "/default/default-profile-image.png"}
                        alt='profile image'
                        width={31}
                        height={31}
                        className='w-full h-full object-cover rounded-full'
                    ></Image>
                </div>
            </Link>}
            <Button
                onClick={handleLogout}
                className='font-bold text-white'
            >Logout</Button>
        </header>
    )
}

export default AppHeader
