import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section id="CTA" className="bg-neutral-50 py-20 px-18">

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16 reveal">
        <h2 className="!text-[clamp(32px,4vw,48px)] text-neutral-900 mb-4">
          Start eating better today
        </h2>
        <p className="body-text text-neutral-500 mb-9">
          Sign up now to order meals, share recipes, or grow your restaurant business with us.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <Link href="/sign-up" className='text-white font-bold'>Sign up</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild className='text-primary-500 font-bold'>
            <Link href="/sign-in">Log in</Link>
          </Button>
        </div>
      </div>

      {/* Visual block */}
      <div className="relative rounded-[28px] overflow-hidden min-h-[400px]
        flex items-center justify-center
        bg-lp-hero shadow-[0_40px_100px_rgba(0,0,0,0.15)] reveal">

        {/* Glow orb */}
        <div className="absolute w-[300px] h-[300px] rounded-full top-[-100px] right-[-100px] lp-pulse
          bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,transparent_70%)]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bottom-[-100px] left-[-100px] lp-pulse
          bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,transparent_70%)]" />
        <div className="absolute w-[300px] h-[300px] rounded-full top-[-100px] left-[-100px] lp-pulse
          bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,transparent_70%)]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bottom-[-100px] right-[-100px] lp-pulse
          bg-[radial-gradient(circle,rgba(255,102,0,0.22)_0%,transparent_70%)]" />

        {/*
          Replace this placeholder with your real image:
          <Image src="/landing-page/eat.svg" alt="eat" width={1312} height={957} className="w-full h-auto" />
        */}
        <div className="relative z-10 text-center px-16 py-16">
          <span className="text-[80px] block mb-6 lp-float">🍽️</span>
          <h2 className="font-display !text-[clamp(28px,3vw,40px)] !font-bold text-primary-600 mb-3">
            Your next favorite meal is waiting
          </h2>
          <p className="body-text text-neutral-500/70">
            Discover restaurants, share recipes, and connect with food lovers across Algeria
          </p>
        </div>
      </div>
    </section>
  )
}
