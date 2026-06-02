import { MessageSquareMore, Video, Share2, ChefHat } from 'lucide-react'

const BENEFITS = [
  {
    Icon:  MessageSquareMore,
    title: 'Real reviews from real people',
    desc:  'Honest ratings and comments help you choose well and help restaurants improve.',
  },
  {
    Icon:  Video,
    title: 'Share your recipes and photos',
    desc:  'Post your creations and watch others try them. Get feedback from home cooks and professional chefs alike.',
  },
  {
    Icon:  Share2,
    title: 'Weekly cooking challenges',
    desc:  'Compete for recognition and rewards. Show off your best dish and earn points toward restaurant discounts.',
  },
  {
    Icon:  ChefHat,
    title: 'Quick videos and tips',
    desc:  'Learn fast recipes and cooking tricks from people who know. Watch short videos that teach you something real.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="bg-neutral-0 py-20 px-18">
      {/* Header */}
      <div className="text-center mb-16 reveal">
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-primary-500 mb-3">
          Benefits
        </p>
        <h2 className="!text-[clamp(32px,4vw,48px)] text-neutral-900">
          Everything in one place
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-8">
        {BENEFITS.map(({ Icon, title, desc }, i) => (
          <div
            key={i}
            className="benefit-card px-6 py-9 rounded-[20px]
              bg-neutral-50 border border-neutral-100
              transition-all duration-300 cursor-default
              hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,102,0,0.09)]
              reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="w-13 h-13 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
              <Icon size={24} className="text-primary-500" />
            </div>
            <h4 className="!text-[17px] !font-bold text-neutral-900 mb-3 leading-snug">
              {title}
            </h4>
            <p className="body-text text-neutral-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
