"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EnvWarning } from "@/components/env-warning";
import { LiveIndicator } from "@/components/live-indicator";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime, formatRelative } from "@/lib/format";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import { ContentTask } from "@/lib/types";

export default function GovernanceFeedPage() {
  const [tasks, setTasks] = useState<ContentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    if (!hasSupabaseEnv) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("content_tasks")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setTasks((data || []) as ContentTask[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTasks();

    if (!hasSupabaseEnv) return;

    const channel = supabase
      .channel("content_tasks_feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "content_tasks" },
        () => {
          loadTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadTasks]);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let pending = 0;
    let approvedToday = 0;
    let rejectedToday = 0;

    for (const task of tasks) {
      if (task.status === "PENDING_APPROVAL") pending++;

      if (task.approved_at && new Date(task.approved_at) >= today) {
        approvedToday++;
      }

      if (task.rejected_at && new Date(task.rejected_at) >= today) {
        rejectedToday++;
      }
    }

    return { pending, approvedToday, rejectedToday };
  }, [tasks]);

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] text-slate-400">GOVERNANCE PORTAL</p>
            <h2 className="text-2xl font-semibold text-slate-100">AAAGTMP — Governance Feed</h2>
          </div>
          <LiveIndicator />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Pending approval" value={stats.pending} />
          <StatCard label="Approved today" value={stats.approvedToday} />
          <StatCard label="Rejected today" value={stats.rejectedToday} />
        </div>
      </section>

      {!hasSupabaseEnv && <EnvWarning />}

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/50 p-4 text-sm text-red-200">
          Failed to load content tasks: {error}
        </div>
      )}

      <section className="space-y-3">
        {loading ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-sm text-slate-300">
            Loading governance feed...
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-sm text-slate-300">
            No tasks yet.
          </div>
        ) : (
          tasks.map((task) => (
            <Link
              key={task.id}
              href={`/approve/${task.run_id}`}
              className="block rounded-lg border border-slate-700 bg-slate-800 p-4 transition hover:border-teal-500/60 hover:bg-slate-800/80"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="font-mono text-xs text-slate-400">{task.run_id}</p>
                  <p className="text-sm text-slate-100 sm:text-base">{task.topic}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="rounded bg-slate-700/60 px-2 py-1">{task.opco}</span>
                    <span className="rounded bg-slate-700/60 px-2 py-1 uppercase">
                      {task.platform}
                    </span>
                    <span>{formatDateTime(task.created_at)}</span>
                    <span>({formatRelative(task.created_at)})</span>
                  </div>
                </div>

                <div className="space-y-2 sm:text-right">
                  <StatusBadge status={task.status} />
                  {task.approver ? (
                    <p className="text-xs text-slate-400">by {task.approver}</p>
                  ) : (
                    <p className="text-xs text-slate-500">Awaiting reviewer</p>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  );
}
