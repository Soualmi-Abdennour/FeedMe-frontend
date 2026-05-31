import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = [
  { label: 'Community',   href: '#community' },
  { label: 'Order',       href: '#features'  },
  { label: 'Contact',     href: '#footer'    },
  { label: 'Get Started', href: '/sign-up'   },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/' },
  { label: 'Terms of Service', href: '/' },
  { label: 'Cookie Settings',  href: '/' },
]

// Social items — swap emoji spans for <Image> once assets are ready
const SOCIALS = [
  { label: 'WhatsApp',  emoji: '📱', src: '/landing-page/whatsapp.svg'  },
  { label: 'Snapchat',  emoji: '👻', src: '/landing-page/snapchat.svg'  },
  { label: 'Facebook',  emoji: '📘', src: '/landing-page/facebook.svg'  },
  { label: 'Instagram', emoji: '📷', src: '/landing-page/instagram.svg' },
  { label: 'Telegram',  emoji: '✈️', src: '/landing-page/telegram.svg'  },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-neutral-900 pt-16 pb-10 px-18">

      {/* Top row: logo | links | socials */}
      <div className="grid grid-cols-3 gap-10 items-center pb-14 border-b border-neutral-0/10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          {/*
            Replace with your real logo:
            <Image src="/FeedMe Orange.svg" width={30} height={30} alt="FeedMe" />
          */}
          <Image src="FeedMe Orange.svg" width={40} height={40} alt='logo' ></Image>
          <span className="font-display text-[20px] font-bold text-neutral-0">FeedMe</span>
        </div>

        {/* Nav links */}
        <ul className="flex items-center justify-center gap-8 list-none m-0 p-0">
          {FOOTER_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-neutral-400 text-[14px] font-medium no-underline
                  hover:text-primary-300 transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="flex items-center justify-end gap-3">
          {SOCIALS.map(({ label, emoji, src }) => (
            <Link
              key={label}
              href="#"
              title={label}
              className="w-9 h-9 rounded-full bg-neutral-0/8 border border-neutral-0/15
                flex items-center justify-center no-underline text-base
                transition-all duration-200
                hover:bg-primary-500 hover:border-primary-500 hover:-translate-y-0.5"
            >
              {/*
                Replace emoji with real icon:
                <Image src={src} width={18} height={18} alt={label} />
              */}
              <span>{emoji}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom row: copyright | legal */}
      <div className="grid grid-cols-2 gap-10 items-center pt-8">
        <p className="text-[13px] text-neutral-500 m-0">
          © 2026 DZ Community Food. All rights reserved.
        </p>
        <ul className="flex items-center justify-end gap-6 list-none m-0 p-0">
          {LEGAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[13px] text-neutral-500 no-underline
                  hover:text-neutral-200 transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
