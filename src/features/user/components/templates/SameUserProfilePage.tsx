"use client"
import { useAppSelector } from '@/store/base.store';
import React, { useState } from 'react';
import { MY_PROFILE_NAV_ITEMS } from '../../constants/profile.constants';
import ProfileHeader from '../molecules/ProfileHeader';
import ProfilePostsNavBar from '../molecules/ProfilePostsNavBar';
import UserProfileLikedPosts from '../organism/UserProfileLikedPosts';
import UserProfilePosts from '../organism/UserProfilePosts';
import UserProfileSavedPosts from '../organism/UserProfileSavedPosts';

function SameUserProfilePage() {
    const { user } = useAppSelector(state => state.user)
    const [currentTab,setCurrentTab]=useState<string>("MY_POSTS")

    const renderTab=():React.ReactNode=>{
        if(currentTab==='MY_POSTS')
            return <UserProfilePosts></UserProfilePosts>
        else if(currentTab==='SAVED_POSTS')            
            return <UserProfileSavedPosts ></UserProfileSavedPosts>
        else if(currentTab==='LIKED_POSTS')
            return <UserProfileLikedPosts ></UserProfileLikedPosts>
    }

    return (
        <div className="relative z-0 w-full overflow-y-scroll">
            <ProfileHeader user={user!} sameUser={true} />
            <div>
                <ProfilePostsNavBar navItems={MY_PROFILE_NAV_ITEMS} currentTab={currentTab} setCurrentTab={setCurrentTab}></ProfilePostsNavBar>
                {renderTab()}
            </div>
        </div>
    );

}

export default SameUserProfilePage
