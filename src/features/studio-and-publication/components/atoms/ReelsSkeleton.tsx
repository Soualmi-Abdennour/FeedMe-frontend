import React from 'react'

function ReelsSkeleton() {
  return (
      <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-neutral-400">
              <div className="w-10 h-10 border-2 border-neutral-200 border-t-neutral-500 rounded-full animate-spin" />
              <span className="text-sm tracking-widest uppercase font-light">Loading</span>
          </div>
      </div>
  )
}

export default ReelsSkeleton
