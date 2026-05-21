"use client"
import { KITCHEN_CATEGORY } from '@/constants/app.constants'
import { useAppSelector } from '@/store/base.store'
import { EDIT_RESTAURANT_USER_BASIC_INFORMATION_FORM_FIELDS, EDIT_RESTAURANT_USER_LOCATION_FORM_FIELDS } from '../../constants/restaurantUserEditProfile.constants'
import { restaurantEditBasicInfoFormSchema, restaurantEditLocationFormSchema } from '../../schema/restaurantUserEditProfile.schema'
import { RestaurantUserProfileAppModel } from '../../types/user.types'
import EditInformationForm from '../molecules/EditInformationForm'
import EditRestaurantServicesForm from '../molecules/EditRestaurantServicesForm'
import EditRestaurantWorkingDaysForm from '../molecules/EditRestaurantWorkingDaysForm'
import EditSelectForm from '../molecules/EditSelectForm'





function RestaurantUserEditProfilePage() {
    const { profile } = useAppSelector(state => state.user.user!)
    const { restaurantBasicInformation, restaurantDetails, restaurantLocationAndContact, restaurantServices } = profile as RestaurantUserProfileAppModel
    return (
        <div className='flex flex-col gap-10 mx-10'>
            <EditInformationForm
                endpoint={"restaurant"}
                fieldToUpdate={"restaurantBasicInformation"}
                formFields={EDIT_RESTAURANT_USER_BASIC_INFORMATION_FORM_FIELDS}
                defaultValues={restaurantBasicInformation}
                validationSchema={restaurantEditBasicInfoFormSchema}
            >
            </EditInformationForm>
            <EditInformationForm
                endpoint={"restaurant"}
                fieldToUpdate={"restaurantLocationAndContact"}
                formFields={EDIT_RESTAURANT_USER_LOCATION_FORM_FIELDS}
                defaultValues={restaurantLocationAndContact}
                validationSchema={restaurantEditLocationFormSchema}
            >
            </EditInformationForm>
            <EditSelectForm
                itemsList={KITCHEN_CATEGORY.map((category) => category.value)}
                endpoint={"restaurant"}
                fieldToUpdate={["restaurantDetails", "kitchenCategory"]}
                sectionTitle='Kitchen category'
                defaultValues={restaurantDetails.kitchenCategory}
            ></EditSelectForm>
            <EditRestaurantWorkingDaysForm
                defaultValues={restaurantDetails.workingDays}
            ></EditRestaurantWorkingDaysForm>
            <EditRestaurantServicesForm
                defaultValues={restaurantServices}
            ></EditRestaurantServicesForm>
        </div>
    )
}

export default RestaurantUserEditProfilePage
