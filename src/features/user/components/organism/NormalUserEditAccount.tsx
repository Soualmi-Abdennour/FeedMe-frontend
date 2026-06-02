"use client"
import { useAppSelector } from '@/store/base.store'
import EditAccountForm from '../molecules/EditAccountForm'
import DangerZoneSection from '../molecules/DangerZoneSection'
import NotificationsToggle from '../molecules/NotificationsToggle'

function NormalUserEditAccount() {
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
            <NotificationsToggle /> 
            <DangerZoneSection/> 
        </div>
    )
}

export default NormalUserEditAccount