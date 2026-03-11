"use client"
import SubmitButton from "@/components/atoms/SubmitButton"
import { KITCHEN_CATEGORY } from "@/constants/app.constants"
import { RestaurantUserProfile } from "@/features/user/types/user.types"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { KithcenCategory } from "@/types/app.types"
import { useState } from "react"
import { setStep } from "../../store/onboarding.slice"
import SelectArea from "../atoms/SelectArea"

function RestaurantSelectForm() {
    const dispatch = useAppDispatch()
    const { onboarding } = useAppSelector(state => state.onboarding)
    const profile = onboarding.profile as RestaurantUserProfile
    const [kitchenCategory, setKitchenCategory] = useState<KithcenCategory[]>(profile?.restaurantDetails?.kitchenCategory ?? [])

    const toggleValue = <T,>(value: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
        setter(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    }

    const handleSubmit = () => {
        dispatch(
            setStep({
                step: 4,
                values: { restaurantDetails:{
                    kitchenCategory
                } }
            })
        )
    }
    return (
        <div className="py-10">
            <SelectArea
                areaTitle="I want to"
                selectedItemsList={kitchenCategory}
                itemsList={KITCHEN_CATEGORY.map(item => item.value)}
                handleSelect={(value) => toggleValue(value, setKitchenCategory)}
            ></SelectArea>
            <SubmitButton
                className="mt-10 w-full"
                onClick={handleSubmit}
            >
                {/* {selectionCount > 1 ? "Continue" : "Skip"} */} continure
            </SubmitButton>

        </div>
    )
}

export default RestaurantSelectForm