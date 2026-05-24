import React from 'react'

function ReelLoadingSpinner() {
  return (
      <div className="flex flex-col items-center justify-center gap-3 text-neutral-400">
          <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-500 rounded-full animate-spin" />
          <span className="text-xs tracking-widest uppercase font-light">More reels</span>
      </div>
  )
}

export default ReelLoadingSpinner
