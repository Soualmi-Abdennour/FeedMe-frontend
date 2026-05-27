"use client"
import { useAppSelector } from '@/store/base.store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function AppHeader() {
    const { user } = useAppSelector(state => state.user)
    let profileImage: string
    if (user?.role === "USER")
        profileImage = user.profile?.userBasicInformation.profileImageUrl ?? "e"
    else
        profileImage = user?.profile?.restaurantBasicInformation.restaurantLogoUrl ?? "e"
    return (
        <header className='top-0 flex items-center justify-end gap-4 w-full bg-[#F8F8F8] shadow-[3px_4px_4px_0px_#00000040] h-14 px-3 z-[9999]'>
            <Link href={"/cart"}>
                <ShoppingCart size={24}></ShoppingCart>
            </Link>
            <Link href={"/profile"}>
                <div className='rounded-full size-8 bg-primary-500'>
                    {/* <Image
                        src={"/e"}
                        alt='profile image'
                        width={31}
                        height={31}
                        className='w-full h-full object-cover'
                    ></Image> */}
                </div>
            </Link>
        </header>
    )
}

export default AppHeader
