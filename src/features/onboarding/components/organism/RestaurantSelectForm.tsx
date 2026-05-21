"use client"
import { KITCHEN_CATEGORY } from "@/constants/app.constants"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { KithcenCategory, WeekDay, WorkingDay } from "@/types/app.types"
import { useState } from "react"
import SelectArea from "../../../../components/molecules/SelectArea"
import { IRestaurantWorkingDaysFormInput,IRestaurantWorkingDaysFormOutput } from "../../schema/restaurantUserOnboarding.schema"
import { setStep } from "../../store/onboarding.slice"
import WorkingDaysForm from "../molecules/WorkingDaysForm"
import { toggleValue } from "@/utils/state.utils"
import { RestaurantUserProfileAppModel } from "@/features/user/types/user.types"

function RestaurantSelectForm() {
    const dispatch = useAppDispatch()
    const { onboarding } = useAppSelector(state => state.onboarding)
    const profile = onboarding?.profile as RestaurantUserProfileAppModel
    const [kitchenCategory, setKitchenCategory] = useState<KithcenCategory[]>(profile?.restaurantDetails?.kitchenCategory ?? [])
    const [selectedDays, setSelectedDays] = useState<WeekDay[]>(profile?.restaurantDetails?.workingDays.map(workingDay => workingDay.day) ?? [])

    const allowSubmit = (kitchenCategory.length > 0 && selectedDays.length > 0)

    const onSubmit = (formData: IRestaurantWorkingDaysFormOutput) => {
              
          
        dispatch(setStep({
            step: 4,
            values: {
                restaurantDetails: {
                    kitchenCategory,
                    workingDays: formData
                }
            }
        }))
    }


    return (
        <div className="py-10 flex flex-col gap-15 ">
            <SelectArea
                areaTitle="Usage Goal"
                selectedItemsList={kitchenCategory}
                itemsList={KITCHEN_CATEGORY.map(item => item.value)}
                handleSelect={(value) => toggleValue(value, setKitchenCategory)}
            ></SelectArea>
            <h3 className="text-left text-2xl ">Day Open :</h3>
            <WorkingDaysForm
                defaultValues={profile?.restaurantDetails?.workingDays??[]}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                onSubmit={onSubmit}
                allowSubmit={allowSubmit}
            ></WorkingDaysForm>

        </div>
    )
}

export default RestaurantSelectForm