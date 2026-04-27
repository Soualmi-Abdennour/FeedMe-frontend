"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import RestaurantSelectForm from '@/features/onboarding/components/organism/RestaurantSelectForm'
import StudioPage from '@/features/studio-and-publication/components/templates/StudioPage'
import NormalUserEditProfilePage from '@/features/user/components/organism/NormalUserEditProfile'
import RestaurantUserEditProfilePage from '@/features/user/components/organism/RestaurantUserEditProfile'
import { UserAppModel } from '@/features/user/types/user.types'
import { useAppSelector } from '@/store/base.store'
import Link from 'next/link'
import { ChefHat, Share2, Video, MessageSquareMore } from 'lucide-react'
import VerificationProcess from "@/components/organism/VerificationProcess";
import { VERIFY_EMAIL_MESSAGES } from "@/features/auth/constants/verifyEmail.constants";
import { VERIFY_PASSWORD_MESSAGES } from "@/features/auth/constants/verifyPassword.constants";
import { UserResponse } from "@/types/api.types";
import ResetPasswordPage from "./(auth)/(forget password)/reset-password/page";
import OnboardingProcessPage from "./(protected)/onboarding/page";
import NormalUserOnboardingProcess from "@/features/onboarding/components/templates/NormalUserOnboardingProcess";


export default function Home() {
  // const  user  = useAppSelector(state => state.user.user) as UserAppModel 
  return (
    <div className="">
      {/* <NormalUserEditProfilePage></NormalUserEditProfilePage> */}
      {/* <RestaurantUserEditProfilePage></RestaurantUserEditProfilePage> */}
      {/* {!user ? (
        <><Button>
          <Link href="/sign-up">
            sign up
          </Link>
        </Button>
          <Button>
            <Link href="/sign-in">
              sign in
            </Link>
          </Button>
        </>
      ) : (
        <div>hello </div>
      )} */}
    </div>
  )
}
