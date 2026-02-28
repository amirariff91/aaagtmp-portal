export function EnvWarning() {
  return (
    <div className="rounded-lg border border-amber-600/40 bg-amber-950/50 p-4 text-sm text-amber-200">
      Missing Supabase env vars. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
      <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
    </div>
  );
}
