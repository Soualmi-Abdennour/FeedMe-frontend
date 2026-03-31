"use client"
import { NormalUserProfile } from "@/features/user/types/user.types"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { KithcenCategory, UsageGoal } from "@/types/app.types"
import { useState } from "react"
import { setStep } from "../../store/onboarding.slice"
import SelectArea from "../atoms/SelectArea"
import SubmitButton from "@/components/atoms/SubmitButton"
import { KITCHEN_CATEGORY, USAGE_GOAL } from "@/constants/app.constants"

function UserSelectForm() {
    const dispatch = useAppDispatch()
    const {onboarding}=useAppSelector(state=>state.onboarding)
    const profile=onboarding.profile as NormalUserProfile
    const [usageGoal, setUsageGoal] = useState<UsageGoal[]>(profile?.usagePreferences?.usageGoal ?? [])
    const [kitchenCategory, setKitchenCategory] = useState<KithcenCategory[]>(profile?.usagePreferences?.kitchenCategory ?? [])

    const toggleValue = <T,>(value: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
        setter(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    }

    const selectionCount =(usageGoal.length > 0 ? 1 : 0) + (kitchenCategory.length > 0 ? 1 : 0)
    const handleSubmit = () => {
        const usagePreferences: NormalUserProfile["usagePreferences"] = selectionCount===2
            ? { usageGoal, kitchenCategory }
            : {}

        dispatch(
            setStep({
                step: 3,
                values: { usagePreferences }
            })
        )
    }
    return (
        <div className="py-10">
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
                className="mt-10 w-full"
                onClick={handleSubmit}
                disabled={selectionCount===1}
            >
                {selectionCount > 1 ? "Continue" : "Skip"}
            </SubmitButton>

        </div>
    )
}

export default UserSelectForm