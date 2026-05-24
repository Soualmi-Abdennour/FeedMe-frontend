import React from 'react'

function ReelSnapItem({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="w-full h-screen flex items-center justify-center shrink-0"
            style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        >
            {children}
        </div>
    )
}

export default ReelSnapItem
