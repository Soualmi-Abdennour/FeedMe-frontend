"use client"
import { useAppSelector } from '@/store/base.store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function AppHeader() {
    const { user } = useAppSelector(state => state.user)
    let profileImage
    if (user?.role === "USER")
        profileImage = user.profile?.userBasicInformation.profileImageUrl 
    else
        profileImage = user?.profile?.restaurantBasicInformation.restaurantLogoUrl    
    return (
        <header className='flex items-center justify-end gap-4 w-full bg-[#F8F8F8] shadow-[3px_4px_4px_0px_#00000040] h-14 px-3 z-40'>
            {user?.role==="USER" && <Link href={"/cart"}>
                <ShoppingCart size={24}></ShoppingCart>
            </Link>}
            <Link href={"/profile"}>
                <div className='rounded-full size-8 '>
                    <Image
                        src={profileImage ?? "/default/default-profile-image.png"}
                        alt='profile image'
                        width={31}
                        height={31}
                        className='w-full h-full object-cover rounded-full'
                    ></Image>
                </div>
            </Link>
        </header>
    )
}

export default AppHeader
