"use client"
import { useAppSelector } from '@/store/base.store'
import EditAccountForm from '../molecules/EditAccountForm'
import DangerZoneSection from '../molecules/DangerZoneSection'
import NotificationsToggle from '../molecules/NotificationsToggle'

function NormalUserEditAccount() {
    const { user } = useAppSelector(state => state.user)

    return (
        <div className='flex flex-col gap-10 '>
            <EditAccountForm
                endpoint="user"
                defaultValues={{
                    username: user?.userName ?? "",   
                    email: user?.email ?? "",
                }}
            />
            <NotificationsToggle /> 
            <DangerZoneSection endpoint="user" /> 
        </div>
    )
}

export default NormalUserEditAccount