'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const FAQS = [
  {
    q: 'How do I order food?',
    a: "Search for restaurants near you by location or cuisine type. Browse their menus, add dishes to your cart, and pay securely. You'll track your order from the kitchen to your door in real time.",
  },
  {
    q: 'Can I post my own recipes?',
    a: "Yes. Upload photos of your dishes, write the recipe, and tag the cuisine type. Other cooks will rate your work and share their own versions. It's how we learn from each other.",
  },
  {
    q: 'What are cooking challenges?',
    a: "Weekly competitions where you submit your best dish. Win points that convert to restaurant discounts. It's friendly competition that rewards real cooking talent.",
  },
  {
    q: 'How do restaurants benefit?',
    a: 'Restaurants get a dashboard showing daily sales, visitor counts, top dishes, and customer feedback. They see which meals sell best and when traffic peaks. Smart alerts warn them about low stock or negative reviews.',
  },
  {
    q: 'Is there a cost to join?',
    a: 'No. Signing up as a home cook or restaurant is free. You only pay when you order food or choose premium features for your restaurant page.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section id="FAQ" className="bg-neutral-0 py-20 px-18">

      {/* Header */}
      <div className="text-center mb-16 reveal">
        <h2 className="!text-[clamp(32px,4vw,48px)] text-neutral-900 mb-4">
          Questions
        </h2>
        <p className="body-text text-neutral-500 max-w-lg mx-auto">
          Find answers about ordering, sharing recipes, and using our platform to connect with food lovers.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-2xl mx-auto reveal">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`faq-item border-b border-neutral-200 ${open === i ? 'open' : ''}`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-6 py-7 text-left group bg-transparent border-none cursor-pointer"
            >
              <h3 className="!text-[22px] !font-normal text-neutral-900
                group-hover:text-primary-500 transition-colors duration-200 leading-snug">
                {faq.q}
              </h3>
              <div className="faq-icon w-8 h-8 min-w-[32px] rounded-full
                bg-neutral-100 border border-neutral-200
                flex items-center justify-center text-[18px] text-primary-500 font-light">
                +
              </div>
            </button>
            <div className="faq-answer">
              <p className="body-text text-neutral-500 pb-6">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Need more help */}
      <div className="text-center mt-20 pt-16 border-t border-neutral-100 reveal">
        <h2 className="!text-[clamp(28px,3vw,44px)] text-neutral-900 mb-4">
          Need more help?
        </h2>
        <p className="body-text text-neutral-500 mb-7">
          Reach out to our support team anytime.
        </p>
        <Button variant="secondary" size="default" asChild>
          <Link href="/">Contact</Link>
        </Button>
      </div>
    </section>
  )
}
