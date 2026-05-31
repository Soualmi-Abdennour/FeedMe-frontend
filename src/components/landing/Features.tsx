'use client'

import Image from 'next/image'
import { useState } from 'react'

const FEATURES = [
  {
    title: 'Filter by price and rating',
    desc:  'See what others loved. Sort by cost and star ratings to find restaurants that match your budget and taste.',
  },
  {
    title: 'Track your order in real time',
    desc:  'Watch your meal move through the kitchen and across the city. Know exactly when it arrives at your door.',
  },
  {
    title: 'Search by cuisine type',
    desc:  'Find traditional dishes, fast food, sweets, or healthy options. Every restaurant is tagged so you discover exactly what you crave.',
  },
]

const FOOD_CARDS = [
  { emoji: '🥩', name: 'Grilled Lamb',  price: '1,200 DZD', cls: 'lp-float' },
  { emoji: '🍕', name: 'Pizza',          price: '850 DZD',   cls: 'lp-float-delay' },
  { emoji: '🧆', name: 'Couscous',       price: '950 DZD',   cls: 'lp-float-delay2' },
]

export default function Features() {
  const [active, setActive] = useState(0)

  return (
    <section id="features" className="bg-neutral-0 py-20 px-18">
      {/* Header */}
      <div className="text-center mb-16 reveal">
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-primary-500 mb-3">
          Order
        </p>
        <h2 className="!text-[clamp(32px,4vw,48px)] text-neutral-900 mb-4">
          Find restaurants nearby and<br />order with ease
        </h2>
        <p className="body-text text-neutral-500 max-w-xl mx-auto">
          Browse local restaurants in your neighborhood. Filter by cuisine type, price range,
          or ratings to find exactly what you want. Order online and track your meal from kitchen to door.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-2 gap-20 items-center">

        {/* Feature list */}
        <div className="flex flex-col reveal-left">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`feature-item px-6 py-7 border-b border-neutral-200 cursor-pointer last:border-b-0 ${active === i ? 'active' : ''}`}
            >
              <h3 className={`!text-[24px] !font-medium mb-2 transition-colors duration-200
                ${active === i ? 'text-primary-500' : 'text-neutral-900 hover:text-primary-500'}`}>
                {f.title}
              </h3>
              <p className="body-text text-neutral-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="reveal-right rounded-3xl overflow-hidden bg-neutral-50
          min-h-[460px] flex items-center justify-center
          shadow-[0_32px_80px_rgba(0,0,0,0.08)]">
          {/*
            Replace with your real image:
            <Image src="/landing-page/threepic.svg" alt="restaurants" width={737} height={462} className="w-full h-auto" />
          */}
          <div className="w-full h-[460px] bg-gradient-to-br from-primary-50 to-primary-100
            flex flex-col items-center justify-center gap-4 p-8">
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              {FOOD_CARDS.map((card, i) => (
                <div key={i}
                  className={`bg-neutral-0 rounded-2xl p-5 text-center
                    shadow-[0_8px_24px_rgba(255,102,0,0.1)] ${card.cls}`}>
                  <span className="text-4xl block mb-2">{card.emoji}</span>
                  <div className="text-[12px] font-semibold text-neutral-900">{card.name}</div>
                  <div className="text-[11px] text-primary-500 mt-1">{card.price}</div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-primary-400 font-medium mt-2">
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
