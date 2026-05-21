"use client"
import { KITCHEN_CATEGORY, USAGE_GOAL } from '@/constants/app.constants'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { UserResponse } from '@/types/api.types'
import { KithcenCategory, UsageGoal } from '@/types/app.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toast } from 'sonner'
import { EDIT_NORMAL_USER_INFORMAION_FORM_FIELDS } from '../../constants/normalUserEditProfile.constants'
import { useUpdateProfileMutation } from '../../store/user.api.slice'
import { setUser } from '../../store/user.slice'
import { NormalUserProfileAppModel } from '../../types/user.types'
import { mapUserDbToAppModel } from '../../utils/user.utils'
import EditInformationForm from '../molecules/EditInformationForm'
import EditSelectForm from '../molecules/EditSelectForm'
import { normalUserEditBasicInfoFormSchema } from '../../schema/normalUserEditProfile.schema'

interface Props { }

function NormalUserEditProfilePage(props: Props) {
    // const dispatch = useAppDispatch()
    // const [updateProfile] = useUpdateProfileMutation()

    const { profile } = useAppSelector(state => state.user.user!)
    const { userBasicInformation, userUsagePreferences } = profile as NormalUserProfileAppModel
    // const handleSubmit2 = async (data: KithcenCategory[]) => {
    //     console.log({
    //         profile: {
    //             userUsagePreferences: {
    //                 usageGoal: data
    //             }
    //         }
    //     });
    //     const fetchResponse = await updateProfile({
    //         endpoint: "user",
    //         profile: {
    //             userUsagePreferences: {
    //                 kitchenCategory: data
    //             }
    //         }
    //     })
    //     const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    //     const successResponse: UserResponse = fetchResponse.data as UserResponse
        
    //     if (error) {
    //         const errorResponse = error.data as UserResponse
    //         if (errorResponse.status === "ERROR") {
    //             toast.error("Something Went wrong.")
    //         }
    //         else {
    //             toast.error(errorResponse.message)
    //         }
    //     }
    //     else {

    //         const successResponseData = successResponse.data
    //         console.log(successResponseData);
    //         toast.success(successResponse.message)
    //         dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
    //     }
    // }
    return (
        <div className='flex flex-col gap-10'>
            <EditInformationForm
                fieldToUpdate={"userBasicInformation"}
                endpoint={"user"}
                formFields={EDIT_NORMAL_USER_INFORMAION_FORM_FIELDS}
                defaultValues={userBasicInformation}
                validationSchema={normalUserEditBasicInfoFormSchema}
            >
            </EditInformationForm>
            <EditSelectForm
                endpoint={"user"}
                fieldToUpdate={["userUsagePreferences", "usageGoal"]}
                itemsList={
                    USAGE_GOAL.map((goal) => goal.value)
                // ["Follow healthy food","Share food photos","Deserts & Sweets","Seafood"]
                }
                sectionTitle={'I want to :'}
                defaultValues={userUsagePreferences.usageGoal ?? []}
            ></EditSelectForm>
            <EditSelectForm
                endpoint={"user"}
                fieldToUpdate={["userUsagePreferences", "kitchenCategory"]}
                itemsList={
                    KITCHEN_CATEGORY.map((category) => category.value)
                // ["vegetarian","vegetarian"]
                }
                sectionTitle={'Kitchen category'}
                defaultValues={userUsagePreferences.kitchenCategory ?? []}
            ></EditSelectForm>
        </div>
    )
}

export default NormalUserEditProfilePage
