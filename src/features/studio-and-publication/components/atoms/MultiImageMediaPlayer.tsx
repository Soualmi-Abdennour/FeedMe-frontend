import { useState } from "react"
import { MediaAppModel } from "../../types/media.types"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

function MultiImageMediaPlayer({ mediaList }: { mediaList: MediaAppModel[] }) {
    const [index, setIndex] = useState(0)

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIndex(i => (i - 1 + mediaList.length) % mediaList.length)
    }

    const next = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIndex(i => (i + 1) % mediaList.length)
    }

    return (
        <div className="relative h-full w-full overflow-hidden bg-black">

            {/* Slides — all stacked, only active one visible */}
            {mediaList.map((m, i) => (
                <div
                    key={m.id}
                    className={`absolute inset-0 transition-opacity duration-300 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <Image
                        src={m.previewUrl}
                        alt={`media ${i + 1}`}
                        fill
                        className="object-contain"
                        sizes="387px"
                    />
                </div>
            ))}

            {/* Prev / Next */}
            {mediaList.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 backdrop-blur-sm transition hover:bg-black/60"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="size-5 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 backdrop-blur-sm transition hover:bg-black/60"
                        aria-label="Next"
                    >
                        <ChevronRight className="size-5 text-white" />
                    </button>
                </>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {mediaList.map((_, i) => (
                    <button
                        key={i}
                        onClick={e => { e.stopPropagation(); setIndex(i) }}
                        className={`h-1.5 rounded-full transition-all duration-200 ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

        </div>
    )
}

export default MultiImageMediaPlayer