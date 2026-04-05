"use client"
import React, { useEffect } from 'react'
import NormalUserEditProfilePage from '../organism/NormalUserEditProfile'
import { useAppSelector } from '@/store/base.store'
import RestaurantUserEditProfilePage from '../organism/RestaurantUserEditProfile'
import { UserAppModel } from '../../types/user.types'

interface Props { }

function EditProfilePage(props: Props) {
    
    const {user}=useAppSelector(state=>state.user)
    
    if(!user?.profile) return (
        <h1>Fuck js</h1>
    )
        
    return (
        <main>
        {user?.role==="USER" ? (
            <NormalUserEditProfilePage></NormalUserEditProfilePage>
        ):(
           user?.role==="RESTAURANT" && <RestaurantUserEditProfilePage></RestaurantUserEditProfilePage>
        )}
        </main>
    )
}

export default EditProfilePage
