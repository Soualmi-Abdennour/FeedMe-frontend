"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton'
import OtherUserProfilePage from '@/features/user/components/templates/OtherUserProfilePage'
import SameUserProfilePage from '@/features/user/components/templates/SameUserProfilePage'
import { useAppSelector } from '@/store/base.store'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

function Page() {
  const { userName } = useParams()
  const {user}=useAppSelector(state=>state.user)
  const router=useRouter()
  if(user?.userName===userName){
    router.replace("/profile")
  }
  if(user?.userName===userName) return <RouteGuardSkeleton></RouteGuardSkeleton>
  return <OtherUserProfilePage userName={userName as string}></OtherUserProfilePage>
}

export default Page
