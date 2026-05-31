"use client"
import { useAppSelector } from '@/store/base.store'
import SelectOnboardingRole from '../molecules/SelectOnboardingRole'
import SubmitOnboardingProcess from '../organism/SubmitOnboardingProcess'
import NormalUserOnboardingProcess from './NormalUserOnboardingProcess'
import RestaurantUserOnboardingProcess from './RestaurantUserOnboardingProcess'
import Image from 'next/image'


function OnboardingProcessPage() {
    const { onboarding } = useAppSelector(state => state.onboarding)
    if (!onboarding || onboarding.onboardingType === "GUEST" || onboarding?.step === 0)
        return <SelectOnboardingRole></SelectOnboardingRole>
    if (onboarding?.isOnboardingCompleted) {
        return <SubmitOnboardingProcess></SubmitOnboardingProcess>
    }

    return (
        <div className=''>
            {onboarding?.onboardingType === "USER" ? (
                <div className="w-fit pt-5 mx-auto max-w-[1026px] min-w-32 flex flex-col  gap-5">
                    <div className=' px-4  rounded-md mx-auto '>
                    <Image src="FeedMe Orange.svg" width={60} height={60} alt='logo' ></Image>
                    </div>
                    <div
                        className=" relative shadow-1 pt-8  pb-8 px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                        <Image
                            src={'auth/bck-form.svg'}
                            fill
                            alt='bck'
                            className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                        ></Image>
                        <div>
                            <NormalUserOnboardingProcess ></NormalUserOnboardingProcess>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-fit pt-5 mx-auto max-w-[1026px] min-w-32 flex flex-col  gap-5">
                    <div className='py-2 px-4 rounded-md mx-auto '>
                    <Image src="FeedMe Orange.svg" width={60} height={60} alt='logo' ></Image>
                    </div>
                    <div
                        className="relative shadow-1 pt-8 pb-8 px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                        <Image
                            src={'auth/bck-form.svg'}
                            fill
                            alt='bck'
                            className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                        ></Image>
                        <div>
                            <RestaurantUserOnboardingProcess ></RestaurantUserOnboardingProcess>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default OnboardingProcessPage
