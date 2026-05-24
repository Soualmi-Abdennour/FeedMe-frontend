import React from 'react'


function EndOfFeed() {

    return (
        <div className="flex flex-col items-center justify-center gap-2 text-neutral-400">
            <div className="w-8 h-px bg-neutral-300" />
            <span className="text-xs tracking-widest uppercase font-light">You&apos;re all caught up</span>
            <div className="w-8 h-px bg-neutral-300" />
        </div>
    )
}

export default EndOfFeed
