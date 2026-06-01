const ITEMS = [
  '🍕 Pizza', '🥩 Grills', '🍜 Soups', '🥗 Salads',
  '🧆 Couscous', '🥘 Tajine', '🍰 Desserts', '☕ Coffee', '🥙 Sandwiches',
]

export default function Marquee() {
  // Duplicate for seamless infinite loop
  const all = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-primary-500 py-[18px] overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap lp-marquee">
        {all.map((item, i) => (
          <span key={i} className="text-[14px] font-medium text-neutral-0/95">
            {item}
            <span className="mx-4 text-neutral-0/35">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
