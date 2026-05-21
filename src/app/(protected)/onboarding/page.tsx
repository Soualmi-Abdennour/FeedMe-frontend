import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/shadcn.utils'
import OnboardingProcessPage from "@/features/onboarding/components/templates/OnboardingProcessPage";

function page() {
    return (
        <main className={cn(' min-h-screen bg-auth-gradient relative px-[280px] py-[44px]')}>
            <Image
                src={'/auth/auth-bck.png'}
                fill
                alt='bck'
                className='absolute top-0 left-0 z-0 object-cover opacity-30'
            ></Image>
            <div className='relative z-10'>
                <OnboardingProcessPage></OnboardingProcessPage>
            </div>
        </main>
    )
}

export default page
