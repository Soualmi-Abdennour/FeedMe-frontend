"use client"
import { useAppSelector } from '@/store/base.store'
import SelectOnboardingRole from '../molecules/SelectOnboardingRole'
import SubmitOnboardingProcess from '../organism/SubmitOnboardingProcess'
import NormalUserOnboardingProcess from './NormalUserOnboardingProcess'
import RestaurantUserOnboardingProcess from './RestaurantUserOnboardingProcess'
import Image from 'next/image'


function OnboardingProcessPage() {
    const { onboarding } = useAppSelector(state => state.onboarding)
    if (!onboarding || onboarding.onboardingType==="GUEST" || onboarding?.step === 0)
        return <SelectOnboardingRole></SelectOnboardingRole>
    if (onboarding?.isOnboardingCompleted) {                
        return <SubmitOnboardingProcess></SubmitOnboardingProcess>
    }

    return (
        <div className=''>
            {onboarding?.onboardingType === "USER" ? (
                <div className="w-fit pt-5 mx-auto max-w-[1026px] min-w-32 flex flex-col  gap-5">
                <div className='py-2 px-4 bg-orange-500 rounded-md mx-auto '>
                <h4 className='text-white'>FeedMe</h4>
            </div>
                <div 
                    className=" relative shadow-1 pt-8  pb-14 px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                    <Image
                        src={'auth/bck-form.svg'}
                        fill
                        alt='bck'
                        className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                    ></Image>
                        <div className="min-w-[320px] text-center justify-center mx-auto">
                        <h4>Basic information</h4>
                        
                        <NormalUserOnboardingProcess ></NormalUserOnboardingProcess>
                    </div>
                </div>
        </div>
            ) : (
                <div className="w-fit pt-5 mx-auto max-w-[1026px] min-w-32 flex flex-col  gap-5">
                <div className='py-2 px-4 bg-orange-500 rounded-md mx-auto '>
                <h4 className='text-white'>FeedMe</h4>
            </div>
                <div 
                            className="relative shadow-1 pt-8 pb-14 px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                    <Image
                        src={'auth/bck-form.svg'}
                        fill
                        alt='bck'
                        className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                    ></Image>
                    <div className="text-center justify-center pb-10 mx-auto min-w-[320px]">
                        <h4 className='pb-5'>Basic information</h4>                        
                        <RestaurantUserOnboardingProcess ></RestaurantUserOnboardingProcess>
                    </div>
                </div>
        </div>
            )}
        </div>
    )
}


export default OnboardingProcessPage
