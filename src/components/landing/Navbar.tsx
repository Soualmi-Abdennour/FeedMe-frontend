'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Features',   href: '#features' },
  { label: 'Benefits',   href: '#benefits' },
  { label: 'Get Started',href: '#CTA' },
  { label: 'FAQ',        href: '#FAQ' },
  { label: 'Contact',    href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 h-[70px]
        flex items-center justify-between px-12
        bg-neutral-0/90 backdrop-blur-md
        border-b border-neutral-100
        transition-shadow duration-300
        ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.07)]' : ''}
      `}
    >
      {/* Logo */}
      <Link href="#home" className="flex items-center gap-3 no-underline">
        {/*
          Replace the placeholder below with your real logo:
          <Image src="/FeedMe Orange.svg" width={34} height={34} alt="FeedMe" />
        */}
        <Image src="/FeedMe-Orange.svg" width={60} height={60} alt='logo' ></Image>
        <span className="font-display text-[22px] font-bold text-neutral-900 leading-none">
          FeedMe
        </span>
      </Link>

      {/* Nav links */}
      <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="nav-link text-neutral-600 text-[15px] font-medium no-underline
                hover:text-primary-500 transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth buttons — using your Button component */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" asChild className='text-primary-500 font-bold'>
          <Link href="/sign-in">Log in</Link>
        </Button>
        <Button variant="primary" size="sm" asChild>
          <Link href="/sign-up" className='text-white font-bold'>Sign up</Link>
        </Button>
      </div>
    </nav>
  )
}
