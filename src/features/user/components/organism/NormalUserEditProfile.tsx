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
    

    const { profile } = useAppSelector(state => state.user.user!)
    const { userBasicInformation, userUsagePreferences } = profile as NormalUserProfileAppModel
    
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
                }
                sectionTitle={'Usage goal :'}
                defaultValues={userUsagePreferences.usageGoal ?? []}
            ></EditSelectForm>
            <EditSelectForm
                endpoint={"user"}
                fieldToUpdate={["userUsagePreferences", "kitchenCategory"]}
                itemsList={
                    KITCHEN_CATEGORY.map((category) => category.value)
                }
                sectionTitle={'Kitchen category'}
                defaultValues={userUsagePreferences.kitchenCategory ?? []}
            ></EditSelectForm>
        </div>
    )
}

export default NormalUserEditProfilePage
