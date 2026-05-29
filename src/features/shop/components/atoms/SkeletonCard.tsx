export  function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-2.5 bg-gray-200 rounded w-2/3 mb-1" />
          <div className="h-2 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="mx-3 rounded-xl bg-gray-200 h-36" />
      <div className="px-3 pt-2 pb-3">
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1.5" />
        <div className="h-3 bg-orange-100 rounded w-1/3" />
      </div>
    </div>
  );
}