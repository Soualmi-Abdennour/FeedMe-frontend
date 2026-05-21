"use client"
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/base.store'
import { ChefHat, User } from 'lucide-react'
import { setStep } from '../../store/onboarding.slice'
import Image from 'next/image'


function SelectOnboardingRole() {
    const dispatch=useAppDispatch()

    return (
        <div className='p-4'>
            <h1 className='text-2xl'>Choose one of two categories:</h1>
        <div className=' flex py-5 px-5 justify-center gap-10 items-center'>
            <div className='relative min-w-[400px] min-h-[520px] items-center rounded-tl-[32px] rounded-br-[32px] shadow-1 pt-8 pb-1 px-20 '>
            <Image
                        src={'onboarding/business.svg'}
                        fill
                        alt='bck'
                        className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                    ></Image>
                <Button variant={"primary"} 
                    className='text-white absolute bottom-20 font-bold w-[206px] shadow-white shadow-1'
                    onClick={()=>{
                        dispatch(setStep({
                            step:1,
                            onboardingType:"RESTAURANT",
                            values:{}
                        }))
                    }}>
                    <h3 className='text-2xl'>Restaurant</h3>
                </Button>
            </div>
            <div>
            <div className='relative min-w-[400px] min-h-[520px] items-center rounded-tl-[32px] rounded-br-[32px] shadow-1 pt-8 pb-1 px-20 '>
            <Image
                        src={'onboarding/normal.svg'}
                        fill
                        alt='bck'
                        className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                    ></Image>
                <Button variant={"primary"} className='text-white absolute bottom-20 font-bold w-[206px]  shadow-white shadow-1'
                    onClick={() => {
                        dispatch(setStep({
                            step: 1,
                            onboardingType: "USER",
                            values: {}
                        }))
                    }}>
                    <h3 className='text-2xl '>Normal</h3>
                </Button>
            </div>
            </div>
        </div>
        </div>
        
    )
    
}

export default SelectOnboardingRole
