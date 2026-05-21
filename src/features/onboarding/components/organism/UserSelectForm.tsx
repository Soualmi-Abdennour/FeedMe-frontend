"use client"
import { NormalUserProfileAppModel } from "@/features/user/types/user.types"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { KithcenCategory, UsageGoal } from "@/types/app.types"
import { useState } from "react"
import { setStep } from "../../store/onboarding.slice"
import SelectArea from "../../../../components/molecules/SelectArea"
import SubmitButton from "@/components/atoms/SubmitButton"
import { KITCHEN_CATEGORY, USAGE_GOAL } from "@/constants/app.constants"
import { toggleValue } from "@/utils/state.utils"

function UserSelectForm() {
    const dispatch = useAppDispatch()
    const {onboarding}=useAppSelector(state=>state.onboarding)
    const profile=onboarding?.profile as NormalUserProfileAppModel
    const [usageGoal, setUsageGoal] = useState<UsageGoal[]>(profile?.userUsagePreferences?.usageGoal ?? [])
    const [kitchenCategory, setKitchenCategory] = useState<KithcenCategory[]>(profile?.userUsagePreferences?.kitchenCategory ?? [])

    const selectionCount =(usageGoal.length > 0 ? 1 : 0) + (kitchenCategory.length > 0 ? 1 : 0)
    const handleSubmit = () => {
        const userUsagePreferences: NormalUserProfileAppModel["userUsagePreferences"] = selectionCount===2
            ? { usageGoal, kitchenCategory }
            : {}

        dispatch(
            setStep({
                step: 3,
                isOnboardingCompleted:true,
                values: { userUsagePreferences }
            })
        )
    }
    return (
        <div className=" flex flex-col justify-start py-5">
            <SelectArea 
                areaTitle="I want to"
                selectedItemsList={usageGoal}
                itemsList={USAGE_GOAL.map(item=>item.value)}
                handleSelect={(value)=>toggleValue(value,setUsageGoal)}
            ></SelectArea>
            <SelectArea 
                areaTitle="Kitchen Categories"
                selectedItemsList={kitchenCategory}
                itemsList={KITCHEN_CATEGORY.map(item=>item.value)}
                handleSelect={(value)=>toggleValue(value,setKitchenCategory)}
            ></SelectArea>
            <SubmitButton
                className="mt-10 w-full text-white"
                onClick={handleSubmit}
                disabled={selectionCount===1}
            >
                {selectionCount > 1 ? "Continue" : "Skip"}
            </SubmitButton>

        </div>
    )
}

export default UserSelectForm