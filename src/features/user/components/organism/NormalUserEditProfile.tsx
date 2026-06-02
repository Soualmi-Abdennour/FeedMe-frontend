"use client"
import { KITCHEN_CATEGORY, USAGE_GOAL } from '@/constants/app.constants'
import { useAppSelector } from '@/store/base.store'
import { EDIT_NORMAL_USER_INFORMAION_FORM_FIELDS } from '../../constants/normalUserEditProfile.constants'
import { normalUserEditBasicInfoFormSchema } from '../../schema/normalUserEditProfile.schema'
import { NormalUserProfileAppModel } from '../../types/user.types'
import EditInformationForm from '../molecules/EditInformationForm'
import EditSelectForm from '../molecules/EditSelectForm'
import EditInformationFormWithImageUploader from '../molecules/EditInformationFormWithImageUploader'

interface Props { }

function NormalUserEditProfilePage(props: Props) {
    

    const { profile } = useAppSelector(state => state.user.user!)
    const { userBasicInformation, userUsagePreferences } = profile as NormalUserProfileAppModel
    
    return (
        <div className='flex flex-col gap-10 pb-8'>
            <EditInformationFormWithImageUploader
                fieldToUpdate={"userBasicInformation"}
                endpoint={"user"}
                formFields={EDIT_NORMAL_USER_INFORMAION_FORM_FIELDS}
                defaultValues={userBasicInformation}
                validationSchema={normalUserEditBasicInfoFormSchema}
            >
            </EditInformationFormWithImageUploader>
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
