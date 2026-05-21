"use client"
import { KITCHEN_CATEGORY } from '@/constants/app.constants'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { EDIT_RESTAURANT_USER_BASIC_INFORMATION_FORM_FIELDS, EDIT_RESTAURANT_USER_LOCATION_FORM_FIELDS } from '../../constants/restaurantUserEditProfile.constants'
import { restaurantEditBasicInfoFormSchema, restaurantEditLocationFormSchema } from '../../schema/restaurantUserEditProfile.schema'
import { RestaurantUserProfileAppModel } from '../../types/user.types'
import EditInformationForm from '../molecules/EditInformationForm'
import EditRestaurantWorkingDaysForm from '../molecules/EditRestaurantWorkingDaysForm'
import EditSelectForm from '../molecules/EditSelectForm'
import { WorkingDay } from '@/types/app.types'
import EditRestaurantServicesForm from '../molecules/EditRestaurantServicesForm'
import { useUpdateProfileMutation } from '../../store/user.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { mapUserDbToAppModel } from '../../utils/user.utils'
import { setUser } from '../../store/user.slice'

interface Props { }

function RestaurantUserEditProfilePage(props: Props) {
    const { profile } = useAppSelector(state => state.user.user!)
    const dispatch = useAppDispatch()
    const [updateProfile] = useUpdateProfileMutation()
    const { restaurantBasicInformation, restaurantDetails, restaurantLocationAndContact, restaurantServices } = profile as RestaurantUserProfileAppModel
    const handleSubmit = async (formData: RestaurantUserProfileAppModel["restaurantDetails"]["kitchenCategory"]) => {
        const fetchResponse = await updateProfile({
            endpoint: "restaurant",
            profile: {
                restaurantDetails: {
                    kitchenCategory: formData,
                    workingDays: restaurantDetails.workingDays
                }
            }
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        if (error) {
            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.message)
            }
        }
        else {
            const successResponseData = successResponse.data
            toast.success(successResponse.message)
            dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
        }
    }
    return (
        <div className='flex flex-col gap-10'>
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
