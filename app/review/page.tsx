"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EnvWarning } from "@/components/env-warning";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime } from "@/lib/format";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import { ContentTask } from "@/lib/types";

export default function ReviewQueuePage() {
  const [tasks, setTasks] = useState<ContentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!hasSupabaseEnv) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("review_queue")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) {
        setError(error.message);
      } else {
        setTasks((data || []) as ContentTask[]);
      }

      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs tracking-[0.2em] text-slate-400">QUEUE</p>
        <h2 className="text-2xl font-semibold text-slate-100">Review Queue</h2>
        <p className="mt-1 text-sm text-slate-400">
          Rejected and errored content tasks requiring follow-up.
        </p>
      </section>

      {!hasSupabaseEnv && <EnvWarning />}

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/50 p-4 text-sm text-red-200">
          Failed to load review queue: {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
          <thead className="bg-slate-800/60 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Run ID</th>
              <th className="px-4 py-3">OpCo</th>
              <th className="px-4 py-3">Topic</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Rejected At</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td className="px-4 py-4 text-slate-400" colSpan={6}>
                  Loading review queue...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-400" colSpan={6}>
                  No rejected/error tasks.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.run_id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-4 font-mono text-xs text-slate-300">
                    <Link href={`/approve/${task.run_id}`} className="hover:text-teal-300">
                      {task.run_id}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{task.opco}</td>
                  <td className="px-4 py-4">{task.topic}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-4 py-4">{formatDateTime(task.rejected_at || task.created_at)}</td>
                  <td className="max-w-md px-4 py-4 text-slate-400">{task.approver_notes || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
