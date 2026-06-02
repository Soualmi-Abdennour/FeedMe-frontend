import { useEffect, useRef, useState } from "react"
import { MediaAppModel } from "../../types/media.types"
import { Pause, Play } from "lucide-react"

function VideoMediaPlayer({ media }: { media: MediaAppModel[] }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [paused, setPaused] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const overlayTimer = useRef<ReturnType<typeof setTimeout>>()
    const video=media[0]
    const toggle = () => {
        const v = videoRef.current
        if (!v) return
        if (v.paused) {
            v.play()
            setPaused(false)
        } else {
            v.pause()
            setPaused(true)
        }
        setShowOverlay(true)
        clearTimeout(overlayTimer.current)
        overlayTimer.current = setTimeout(() => setShowOverlay(false), 900)
    }

    useEffect(() => () => clearTimeout(overlayTimer.current), [])
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        // Autoplay blocked by browser — silently ignore
                    })
                } else {
                    video.pause()
                }
            },
            { threshold: 0.8 }
        )

        observer.observe(video)
        return () => observer.disconnect()
    }, [])
    
    return (
        <div className="relative h-full w-full bg-black" onClick={toggle}>
            <video
                ref={videoRef}
                src={video.previewUrl}
                className="h-full w-full object-contain"
                autoPlay
                loop
                playsInline
            />
            {/* Animated overlay icon */}
            <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showOverlay ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="rounded-full bg-black/40 p-4 backdrop-blur-sm">
                    {paused
                        ? <Play fill="white" className="size-10 text-white" />
                        : <Pause fill="white" className="size-10 text-white" />
                    }
                </div>
            </div>
            {/* Persistent muted pause indicator */}
            {paused && !showOverlay && (
                <div className="absolute bottom-16 right-3 rounded-full bg-black/40 p-2 backdrop-blur-sm">
                    <Pause fill="white" className="size-4 text-white" />
                </div>
            )}
        </div>
    )
}
export default VideoMediaPlayer