import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Button>
        <Link href="/sign-up">
          sign up
        </Link>
      </Button>
      <Button>
        <Link href="/sign-in">
          sign in
        </Link>
      </Button>
    </div>
    // <div>hello</div>
  )
}
