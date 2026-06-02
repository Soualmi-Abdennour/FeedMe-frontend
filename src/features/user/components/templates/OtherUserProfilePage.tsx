import { Ban, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { OTHER_PROFILE_NAV_ITEMS } from '../../constants/profile.constants';
import { useGetUserProfileQuery } from '../../store/user.api.slice';
import { mapUserDbToAppModel } from '../../utils/user.utils';
import ProfileHeader from '../molecules/ProfileHeader';
import ProfilePostsNavBar from '../molecules/ProfilePostsNavBar';
import RestaurantProfileServices from '../molecules/RestaurantProfileServices';
import OtherUserProfilePosts from '../organism/OtherUserProfilePosts';

function OtherUserProfilePage({userName}:{userName:string}) {
    const [currentTab, setCurrentTab] = useState<string>("POSTS")
const { data, isLoading, isError } = useGetUserProfileQuery({ userName})
    if(isLoading) {
        return (
            <div className="flex items-center justify-center py-16 h-full">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            </div>
        )
    }
    if (isError)
    {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground h-full">
                <Ban className="w-8 h-8" ></Ban>
                <p className="text-sm">Failed to load Profile</p>
            </div>
        )
    }
    if(!isLoading && !isError && data?.data?.user )
    {
        const user = mapUserDbToAppModel(data?.data?.user)
        const renderTab = (): React.ReactNode => {
            if (user?.role === "RESTAURANT") {
                if (currentTab === 'POSTS')
                    return <OtherUserProfilePosts userName={userName}></OtherUserProfilePosts>
                else if (currentTab === 'RESTAURANT_INFO' && user?.profile)
                    return <RestaurantProfileServices profile={user.profile} />
            }
        }
        return (
            <div className="relative z-0 w-full h-full overflow-y-scroll">
                <ProfileHeader user={user!} />
                <div>
                    {user?.role === "USER" ? (
                        <OtherUserProfilePosts userName={userName}></OtherUserProfilePosts>
                    ) : (
                        <div>
                            <ProfilePostsNavBar currentTab={currentTab} navItems={OTHER_PROFILE_NAV_ITEMS} setCurrentTab={setCurrentTab}></ProfilePostsNavBar>
                            {renderTab()}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default OtherUserProfilePage
