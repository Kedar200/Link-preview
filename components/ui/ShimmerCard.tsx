export default function ShimmerCard() {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: '#111111', borderColor: 'rgba(255,255,255,0.07)' }}>
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full shimmer" />
          <div className="h-3 w-20 rounded shimmer" />
        </div>
        <div className="w-6 h-6 rounded shimmer" />
      </div>
      {/* Mock platform UI */}
      <div className="p-4 space-y-3">
        <div className="w-full h-36 rounded-lg shimmer" />
        <div className="h-3 w-24 rounded shimmer" />
        <div className="h-4 w-4/5 rounded shimmer" />
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-2/3 rounded shimmer" />
      </div>
    </div>
  );
}
