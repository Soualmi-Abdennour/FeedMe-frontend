"use client"
import { useAppSelector } from '@/store/base.store'
import NormalUserEditAccount from '../organism/NormalUserEditAccount'
import RestaurantUserEditAccount from '../organism/RestaurantUserEditAccount'

interface Props {}

function EditAccountPage(props: Props) {
    const { user } = useAppSelector(state => state.user)

    // fix this
    if (!user?.profile) return (
        <h1>Loading...</h1>
    )

    return (
        <main>
            {user?.role === "USER" ? (
                <NormalUserEditAccount />
            ) : (
                user?.role === "RESTAURANT" && <RestaurantUserEditAccount />
            )}
        </main>
    )
}

export default EditAccountPage