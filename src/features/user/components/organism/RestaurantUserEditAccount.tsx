"use client"
import { useAppSelector } from '@/store/base.store'
import DangerZoneSection from '../molecules/DangerZoneSection'
import EditAccountForm from '../molecules/EditAccountForm'

function RestaurantUserEditAccount() {
    const { user } = useAppSelector(state => state.user)

    return (
        <div className='flex flex-col gap-10 max-w-[700px] mx-auto my-7'>
            <EditAccountForm
                defaultValues={{
                    userName: user?.userName ?? "",
                    email: user?.email ?? "",
                    currentPassword: "",
                    newPassword: "",
                    newPasswordConfirm: "",
                }}
            />
            <DangerZoneSection/> 
        </div>
    )
}

export default RestaurantUserEditAccount