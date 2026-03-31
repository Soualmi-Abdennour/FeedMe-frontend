"use client"
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/base.store'
import { ChefHat, User } from 'lucide-react'
import { setStep } from '../../store/onboarding.slice'



function SelectOnboardingRole() {
    const dispatch=useAppDispatch()
    
    return (
        <div className=' flex justify-center items-center'>
            <div>
                <Button variant={"outline"} 
                    onClick={()=>{
                        dispatch(setStep({
                            step:1,
                            onboardingType:"RESTAURANT",
                            values:{}
                        }))
                    }}>
                    <ChefHat size={80} />
                    <h3>Restaurant</h3>
                </Button>
            </div>
            <div>
                <Button variant={"outline"} className=''
                    onClick={() => {
                        dispatch(setStep({
                            step: 1,
                            onboardingType: "USER",
                            values: {}
                        }))
                    }}>
                    <User size={80} />
                    <h3>Normal</h3>
                </Button>
            </div>
        </div>
    )
}

export default SelectOnboardingRole
