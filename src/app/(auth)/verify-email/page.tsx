"use client"

import { useAppSelector } from '@/store/base.store'
import React from 'react'
import { useSelector } from 'react-redux'

interface Props {}

function Page(props: Props) {
    const {user}=useAppSelector(state=>state.user)
    console.log(user);                

    return (
        <div></div>
    )
}

export default Page
