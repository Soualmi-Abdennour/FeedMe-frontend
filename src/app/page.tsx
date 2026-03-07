"use client"
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/base.store'
import Link from 'next/link'

export default function Home() {
  const { user } = useAppSelector(state => state.user)
  return (
    <div>
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
        <div>hello</div>
      )}
    </div>
  )
}
