"use client"
import OtherUserProfilePage from '@/features/user/components/templates/OtherUserProfilePage'
import SameUserProfilePage from '@/features/user/components/templates/SameUserProfilePage'
import { useAppSelector } from '@/store/base.store'
import { useParams } from 'next/navigation'
import React from 'react'

function Page() {
  const { userId } = useParams()
    return <OtherUserProfilePage userId={userId as string}></OtherUserProfilePage>
}

export default Page
