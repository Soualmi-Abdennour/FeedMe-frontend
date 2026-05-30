"use client"
import { ChefHat, MessageSquareMore, Share2, Video, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing-container w-full min-h-screen scroll-smooth">

      {/* ── NAVBAR ── */}
      <nav className="header bg-white w-full h-[70px] py-4 px-4 md:px-6 flex items-center justify-between md:justify-end z-50 relative">

        {/* Logo visible on mobile */}
        <span className="md:hidden font-bold text-lg text-primary-500">DZ Food</span>

        {/* Hamburger – mobile only */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 font-bold mx-8">
          {['/', '#features', '#benefits', '#CTA', '#FAQ', '#footer'].map((href, i) => (
            <li key={i} className="hover:text-primary-500 hover:border-b-2 hover:border-primary-500 transition-colors duration-200 ease-in-out">
              <Link href={href}>{['Home', 'Features', 'Benefits', 'CTA', 'FAQ', 'Contact'][i]}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth buttons */}
        <ul className="hidden md:flex items-center gap-4 font-bold">
          <li>
            <button className="w-[112px] h-[46px] bg-primary-500 text-white rounded-lg hover:bg-[#D86300] transition-all duration-500 ease-in-out">
              <Link href="/sign-up">Sign up</Link>
            </button>
          </li>
          <li>
            <button className="w-[112px] h-[46px] border-primary-500 border-2 text-primary-500 rounded-lg hover:bg-[#FFEADF] transition-all duration-500 ease-in-out">
              <Link href="/sign-in">Log in</Link>
            </button>
          </li>
        </ul>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-lg z-50 py-4 px-6 flex flex-col gap-4">
            <ul className="flex flex-col gap-4 font-bold">
              {['/', '#features', '#benefits', '#CTA', '#FAQ', '#footer'].map((href, i) => (
                <li key={i} className="hover:text-primary-500 transition-colors duration-200 ease-in-out">
                  <Link href={href} onClick={() => setMenuOpen(false)}>
                    {['Home', 'Features', 'Benefits', 'CTA', 'FAQ', 'Contact'][i]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-2">
              <button className="flex-1 h-[46px] bg-primary-500 text-white rounded-lg hover:bg-[#D86300] transition-all duration-500 ease-in-out font-bold">
                <Link href="/sign-up">Sign up</Link>
              </button>
              <button className="flex-1 h-[46px] border-primary-500 border-2 text-primary-500 rounded-lg hover:bg-[#FFEADF] transition-all duration-500 ease-in-out font-bold">
                <Link href="/sign-in">Log in</Link>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div className="first relative pb-[30px] md:pb-[50px]">
        <div className="img w-full">
          <Image
            src="landing-page/image 12.svg"
            alt="background"
            width={1440}
            height={900}
            className="w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-auto object-cover"
          />
        </div>
        <div className="texts absolute inset-0 text-center flex flex-col justify-center items-center px-4">
          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Where Algeria eats,<br />connects, and shares
          </h1>
          <p className="text-gray-700 text-[13px] sm:text-[15px] md:text-[18px] lg:text-[20px] pt-3 md:pt-5 max-w-xl md:max-w-2xl">
            DZ Food Community brings together home cooks, professional chefs, and local
            restaurants in one place. Share recipes, discover neighborhood spots,
            order meals, and join a community that understands food the way you do.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-5 font-bold">
            <button className="w-[100px] md:w-[112px] h-[40px] md:h-[46px] bg-primary-500 text-white rounded-lg hover:bg-[#D86300] transition-all duration-500 ease-in-out">
              <Link href="/">Explore</Link>
            </button>
            <button className="w-[100px] md:w-[112px] h-[40px] md:h-[46px] bg-transparent border-primary-500 text-primary-500 border-2 rounded-lg hover:bg-[#FFEADF] transition-all duration-500 ease-in-out">
              <Link href="/">Log in</Link>
            </button>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div id="features" className="second flex flex-col py-[40px] md:py-[50px] px-4 md:px-6">

        {/* Section header */}
        <div className="flex flex-col text-center justify-center items-center pb-8">
          <p className="text-gray-700 font-normal text-[15px]">Order</p>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Find restaurants nearby and <br className="hidden sm:block" />order with ease
          </h2>
          <p className="text-gray-700 text-[13px] sm:text-[15px] pt-4 max-w-lg md:max-w-2xl">
            Browse local restaurants in your neighborhood. Filter by cuisine type, price
            range, or ratings to find exactly what you want. Order online and track your
            meal from kitchen to door.
          </p>
        </div>

        {/* Restaurant feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-8 items-center gap-8">
          <div className="max-w-full md:max-w-[550px]">
            {[
              {
                title: 'Filter by price and rating',
                desc: 'See what others loved. Sort by cost and star ratings to find restaurants that match your budget and taste.',
              },
              {
                title: 'Track your order in real time',
                desc: 'Watch your meal move through the kitchen and across the city. Know exactly when it arrives at your door.',
              },
              {
                title: 'Search by cuisine type',
                desc: 'Find traditional dishes, fast food, sweets, or healthy options. Every restaurant is tagged so you discover exactly what you crave.',
                noBorder: true,
              },
            ].map(({ title, desc, noBorder }) => (
              <div key={title} className={`px-4 py-3 ${noBorder ? '' : 'border-b-2 border-black'}`}>
                <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl">{title}</h2>
                <p className="text-gray-700 text-[13px] sm:text-[15px] pt-3">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Image src="landing-page/threepic.svg" alt="three pictures" width={737} height={462} className="w-full max-w-[500px] md:max-w-full" />
          </div>
        </div>

        {/* Community intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-[80px] md:pt-[200px] items-center gap-6">
          <div>
            <p id="community" className="text-gray-700 text-[18px] md:text-[20px] py-3 md:py-5">Community</p>
            <h2 className="font-medium text-3xl md:text-4xl">
              More than food, it&apos;s<br /> connection
            </h2>
          </div>
          <p className="text-[13px] sm:text-[15px] md:pl-10">
            Share your recipes and food stories with people who get it. Read honest
            reviews from real eaters. Compete in cooking challenges and earn rewards
            that mean something. This is where Algeria&apos;s food lovers gather.
          </p>
        </div>

        {/* Benefits grid */}
        <div id="benefits" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-[80px] md:pt-[200px] gap-8">
          {[
            {
              Icon: MessageSquareMore,
              title: 'Real reviews from real people',
              desc: 'Honest ratings and comments help you choose well and help restaurants improve.',
            },
            {
              Icon: Video,
              title: 'Share your recipes and photos',
              desc: 'Post your creations and watch others try them. Get feedback from home cooks and professional chefs alike.',
            },
            {
              Icon: Share2,
              title: 'Weekly cooking challenges',
              desc: 'Compete for recognition and rewards. Show off your best dish and earn points toward restaurant discounts.',
            },
            {
              Icon: ChefHat,
              title: 'Quick videos and tips',
              desc: 'Learn fast recipes and cooking tricks from people who know. Watch short videos that teach you something real.',
            },
          ].map(({ Icon, title, desc }) => (
            <div key={title}>
              <Icon size={30} />
              <h3 className="font-bold text-lg md:text-xl pt-8 pb-2">{title}</h3>
              <p className="font-normal text-gray-700 text-[13px] sm:text-[15px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div id="CTA" className="third flex flex-col py-[40px] md:py-[50px] px-4 md:px-6">
        <div className="flex flex-col text-center justify-center items-center pb-8 pt-[80px] md:pt-[200px]">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Start eating better today
          </h2>
          <p className="text-gray-700 text-[13px] sm:text-[15px] pt-4">
            Sign up now to order meals, share recipes, or grow your restaurant business with us.
          </p>
          <div className="flex items-center gap-4 mt-5 font-bold">
            <button className="w-[100px] md:w-[112px] h-[40px] md:h-[46px] bg-primary-500 text-white rounded-lg hover:bg-[#D86300] transition-all duration-500 ease-in-out">
              <Link href="/sign-up">Sign up</Link>
            </button>
            <button className="w-[100px] md:w-[112px] h-[40px] md:h-[46px] border-primary-500 text-primary-500 border-2 rounded-lg hover:bg-[#FFEADF] transition-all duration-300 ease-in-out">
              <Link href="/sign-in">Log in</Link>
            </button>
          </div>
        </div>
        <div className="py-8 flex justify-center">
          <Image src="landing-page/eat.svg" width={1312} height={957} alt="eat" className="w-full max-w-5xl" />
        </div>
      </div>

      {/* ── FAQ ── */}
      <div id="FAQ" className="fourth flex flex-col py-[40px] md:py-[50px] px-4 md:px-6">
        <div className="flex flex-col text-center justify-center items-center pb-8 pt-[80px] md:pt-[200px]">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">Questions</h2>
          <p className="text-gray-700 text-[13px] sm:text-[15px] pt-4 max-w-md">
            Find answers about ordering, sharing recipes, and using our platform to connect with food lovers.
          </p>
        </div>

        <div className="py-8 text-left mx-auto w-full max-w-2xl">
          {[
            {
              q: 'How do I order food?',
              a: 'Search for restaurants near you by location or cuisine type. Browse their menus, add dishes to your cart, and pay securely. You\'ll track your order from the kitchen to your door in real time.',
            },
            {
              q: 'Can I post my own recipes?',
              a: 'Yes. Upload photos of your dishes, write the recipe, and tag the cuisine type. Other cooks will rate your work and share their own versions. It\'s how we learn from each other.',
            },
            {
              q: 'What are cooking challenges?',
              a: 'Weekly competitions where you submit your best dish. Win points that convert to restaurant discounts. It\'s friendly competition that rewards real cooking talent.',
            },
            {
              q: 'How do restaurants benefit?',
              a: 'Restaurants get a dashboard showing daily sales, visitor counts, top dishes, and customer feedback. They see which meals sell best and when traffic peaks. Smart alerts warn them about low stock or negative reviews.',
            },
            {
              q: 'Is there a cost to join?',
              a: 'No. Signing up as a home cook or restaurant is free. You only pay when you order food or choose premium features for your restaurant page.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="pb-8 md:pb-10">
              <h2 className="font-normal text-2xl md:text-3xl leading-tight">{q}</h2>
              <p className="text-gray-700 text-[13px] sm:text-[15px] pt-3">{a}</p>
            </div>
          ))}
        </div>

        <div className="text-center pb-8">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">Need more help?</h2>
          <p className="text-gray-700 text-[13px] sm:text-[15px] py-5">Reach out to our support team anytime.</p>
          <button className="w-[112px] h-[46px] border-primary-500 text-primary-500 border-2 rounded-lg hover:bg-[#FFEADF] transition-all duration-300 ease-in-out">
            <Link href="/">Contact</Link>
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div id="footer" className="bg-white w-full py-4 px-4 md:px-6 pt-[80px] md:pt-[200px]">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-5">
          <div className="font-bold text-lg">LOGO</div>

          <ul className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-bold">
            {['#community', '#features', '#footer', '/'].map((href, i) => (
              <li key={i} className="hover:text-primary-500 transition-colors duration-200 ease-in-out">
                <Link href={href}>{['Community', 'Order', 'Contact', 'Get Start'][i]}</Link>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-2">
            {['whatsapp', 'snapchat', 'facebook', 'instagram', 'telegram'].map((name) => (
              <li key={name}>
                <Image src={`landing-page/${name}.svg`} width={24} height={24} alt={name} />
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 sm:pt-[100px] pb-4">
          <div className="text-sm text-center sm:text-left">© 2026 DZ Community Food. All rights reserved.</div>
          <ul className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-bold text-sm">
            {['Privacy Policy', 'Terms of services', 'Cookie settings'].map((label) => (
              <li key={label} className="hover:text-primary-500 transition-colors duration-200 ease-in-out">
                <Link href="/">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}