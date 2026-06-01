const ACTIVITIES = [
  {
    emoji: '👨‍🍳',
    title: 'Chef Karim shared a recipe',
    sub:   'Authentic Chorba Frik · 2 min ago',
    badge: '❤️ 142',
  },
  {
    emoji: '🏆',
    title: 'Weekly Challenge',
    sub:   'Best Ramadan dish · 3 days left',
    badge: 'Join',
  },
  {
    emoji: '⭐',
    title: 'New review posted',
    sub:   'Chez Ahmed · ★★★★★',
    badge: null,
  },
]

export default function Community() {
  return (
    <section id="community" className="bg-neutral-50 py-20 px-18">
      <div className="grid grid-cols-2 gap-20 items-center">

        {/* Text */}
        <div className="reveal-left">
          <p className="text-[12px] font-semibold tracking-[3px] uppercase text-primary-500 mb-3">
            Community
          </p>
          <h2 className="!text-[clamp(32px,4vw,48px)] text-neutral-900 mb-6">
            More than food,<br />it&apos;s connection
          </h2>
          <p className="body-text text-neutral-600 leading-[1.8]">
            Share your recipes and food stories with people who get it. Read honest reviews
            from real eaters. Compete in cooking challenges and earn rewards that mean
            something. This is where Algeria&apos;s food lovers gather.
          </p>
        </div>

        {/* Activity feed */}
        <div className="reveal-right flex justify-center">
          <div className="bg-neutral-0 rounded-[28px] p-10
            shadow-[0_24px_60px_rgba(255,102,0,0.07)] w-full max-w-sm">
            <div className="flex flex-col gap-4">
              {ACTIVITIES.map((item, i) => (
                <div key={i}
                  className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl">
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-neutral-900 truncate">
                      {item.title}
                    </div>
                    <div className="text-[12px] text-neutral-400 mt-0.5">{item.sub}</div>
                  </div>
                  {item.badge && (
                    <div className="shrink-0 bg-primary-50 text-primary-500
                      rounded-full px-3 py-1 text-[12px] font-semibold">
                      {item.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
