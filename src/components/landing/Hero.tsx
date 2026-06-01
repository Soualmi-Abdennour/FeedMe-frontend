import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center
        px-6 pt-[120px] pb-20 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 bg-[#FFF3ED]">
  {/* Soft warm mesh glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#FFE6D5_0%,transparent_50%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#FFC9A8_0%,transparent_60%)]" />
  
  {/* Clean bottom fade */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF3ED]" />
</div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-primary-950/55" />

      {/* ── Content ── */}
      <div className="relative z-[2] max-w-3xl lp-hero-in">

        {/* Badge */}
        <div className="lp-slide-down inline-flex items-center gap-2
          bg-primary-500/20 border border-primary-500/40
          rounded-full px-5 py-2 mb-7
          text-[13px] font-medium text-primary-200">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-300 lp-blink" />
          Just launched in Algeria 🇩🇿
        </div>

        {/* Headline */}
        <h1 className="lp-slide-up-1 font-display !text-[clamp(44px,6vw,72px)]
          !font-black !leading-[1.08] text-neutral-0 mb-6">
          Where Algeria{' '}
          <em className="text-primary-300 not-italic">eats,</em>
          <br />connects, and shares
        </h1>

        {/* Sub */}
        <p className="lp-slide-up-2 body-text text-neutral-0/80 font-light mb-10 leading-[1.8]">
          FeedMe brings together home cooks, professional chefs, and local restaurants
          in one place. Share recipes, discover neighborhood spots, order meals, and join
          a community that understands food the way you do.
        </p>

        {/* Buttons — using your Button variants */}
        <div className="lp-slide-up-3 flex items-center justify-center gap-4">
          <Button variant="primary" size="lg" asChild className='text-white  font-bold'>
            <Link href="/">Explore</Link>
          </Button>
          {/* Custom white-bordered ghost button for dark hero */}
          <Link href="/sign-in">
            <button className="h-12 px-8 bg-transparent text-neutral-0
              border-2 border-neutral-0/50 rounded-lg text-btn-1 font-semibold
              hover:border-neutral-0 hover:bg-neutral-0/10 transition-all duration-300">
              Log in
            </button>
          </Link>
        </div>

        {/* Launch pill */}
        <div className="lp-slide-up-4 inline-flex items-center gap-4
          bg-neutral-0/10 border border-neutral-0/20
          rounded-full px-6 py-3 mt-12">
          <span className="text-[22px]">🚀</span>
          <p className="text-[14px] text-neutral-0/85 text-left leading-snug m-0">
            <strong className="text-neutral-0 font-semibold block">We just launched!</strong>
            Be among the first to discover FeedMe in your city.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="lp-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]
        flex flex-col items-center gap-2">
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
