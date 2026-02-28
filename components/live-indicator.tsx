export function LiveIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
      Live
    </div>
  );
}
