"use client"
import { Button } from '@/components/ui/button'
import { UserAppModel } from '@/features/user/types/user.types'
import { useAppSelector } from '@/store/base.store'
import Link from 'next/link'

export default function Home() {
  const  user  = useAppSelector(state => state.user.user) as UserAppModel  
  return (
    <div className="">
      {!user ? (
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
      )}
    </div>
  )
}
