"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EnvWarning } from "@/components/env-warning";
import { formatDateTime } from "@/lib/format";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import { AuditLogEntry } from "@/lib/types";

const PAGE_SIZE = 50;

export function AuditClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") || "1"));

  const [rows, setRows] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const range = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    return { from, to };
  }, [page]);

  useEffect(() => {
    const load = async () => {
      if (!hasSupabaseEnv) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("audit_log")
        .select("*")
        .order("event_at", { ascending: false })
        .range(range.from, range.to);

      if (error) {
        setError(error.message);
      } else {
        setRows((data || []) as AuditLogEntry[]);
      }

      setLoading(false);
    };

    load();
  }, [range.from, range.to]);

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/audit?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs tracking-[0.2em] text-slate-400">IMMUTABLE LOG</p>
        <h2 className="text-2xl font-semibold text-slate-100">Audit Trail</h2>
        <p className="mt-1 text-sm text-slate-400">Latest governance events (50 rows per page).</p>
      </section>

      {!hasSupabaseEnv && <EnvWarning />}

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/50 p-4 text-sm text-red-200">
          Failed to load audit log: {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-800/60 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Run ID</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">OpCo</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td className="px-4 py-4 text-slate-400" colSpan={6}>
                  Loading audit events...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-400" colSpan={6}>
                  No audit rows.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40">
                  <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                    {formatDateTime(row.event_at)}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs">{row.run_id || "—"}</td>
                  <td className="px-4 py-4">{row.event_type}</td>
                  <td className="px-4 py-4">{row.actor || "—"}</td>
                  <td className="px-4 py-4">{row.opco || "—"}</td>
                  <td className="max-w-md px-4 py-4 text-slate-400">{row.notes || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => goToPage(Math.max(page - 1, 1))}
          disabled={page <= 1}
          className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm text-slate-400">Page {page}</p>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={rows.length < PAGE_SIZE}
          className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
