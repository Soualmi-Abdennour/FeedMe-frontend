"use client"
import { useAppSelector } from '@/store/base.store'
import EditAccountForm from '../molecules/EditAccountForm'
import DangerZoneSection from '../molecules/DangerZoneSection'
import NotificationsToggle from '../molecules/NotificationsToggle'

function RestaurantUserEditAccount() {
    const { user } = useAppSelector(state => state.user)

    return (
        <div className='flex flex-col gap-10  bg-white p-10 w-[512px] mx-auto rounded-md'>
            <EditAccountForm
                defaultValues={{
                    userName: user?.userName ?? "",   
                    email: user?.email ?? "",
                }}
            />
            <NotificationsToggle /> 
            <DangerZoneSection endpoint="user" /> 
        </div>
    )
}

export default RestaurantUserEditAccount