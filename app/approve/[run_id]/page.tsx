"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EnvWarning } from "@/components/env-warning";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime } from "@/lib/format";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import { ContentTask } from "@/lib/types";

type Decision = "APPROVED" | "REJECTED";

export default function ApprovalPage() {
  const params = useParams<{ run_id: string }>();
  const runId = params.run_id;

  const [task, setTask] = useState<ContentTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState<Decision | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (!hasSupabaseEnv) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("content_tasks")
        .select("*")
        .eq("run_id", runId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setTask(data as ContentTask);
      }

      setLoading(false);
    };

    if (runId) loadTask();
  }, [runId]);

  const submitDecision = async (decision: Decision) => {
    if (!task?.resume_webhook_url) {
      setResult("No resume webhook URL found for this task.");
      return;
    }

    if (decision === "REJECTED" && !notes.trim()) {
      setResult("Add rejection notes before rejecting.");
      return;
    }

    setSubmitting(decision);
    setResult(null);

    const response = await fetch("/api/approval-decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        webhookUrl: task.resume_webhook_url,
        decision,
        approver: "CC Puan",
        notes: notes.trim(),
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      setResult(body.error || "Failed to send decision.");
      setSubmitting(null);
      return;
    }

    setResult(`${decision} submitted successfully.`);
    setSubmitting(null);
  };

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-block text-sm text-teal-300 hover:text-teal-200">
        ← Governance Feed
      </Link>

      {!hasSupabaseEnv && <EnvWarning />}

      {loading ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-sm text-slate-300">
          Loading task...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500/40 bg-red-950/50 p-4 text-sm text-red-200">
          Failed to load task: {error}
        </div>
      ) : !task ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-sm text-slate-300">
          Task not found.
        </div>
      ) : (
        <>
          <section className="rounded-lg border border-slate-700 bg-slate-800 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <p className="font-mono text-xs text-slate-400">{task.run_id}</p>
                <h2 className="text-xl font-semibold text-slate-100">{task.topic}</h2>
                <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  <Meta label="OpCo" value={task.opco} />
                  <Meta label="Platform" value={task.platform} />
                  <Meta label="Requester" value={task.requester} />
                  <Meta label="Words" value={task.word_count ? String(task.word_count) : "—"} />
                  <Meta label="Model" value={task.model_used || "—"} />
                  <Meta label="Created" value={formatDateTime(task.created_at)} />
                </div>
              </div>

              <div className="space-y-2">
                <StatusBadge status={task.status} />
                {task.approver && (
                  <p className="text-xs text-slate-400">
                    {task.status === "APPROVED" ? "Approved" : "Reviewed"} by {task.approver}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-700 bg-slate-900 p-5">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-slate-400">Draft text</p>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
              {task.draft_text || "No draft text available."}
            </pre>
          </section>

          {task.status === "PENDING_APPROVAL" ? (
            <section className="space-y-3 rounded-lg border border-slate-700 bg-slate-800 p-5">
              <p className="text-sm text-slate-200">Decision notes (required for rejection)</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add context if rejecting..."
                className="min-h-28 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-teal-500"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => submitDecision("APPROVED")}
                  disabled={Boolean(submitting)}
                  className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting === "APPROVED" ? "Submitting..." : "Approve"}
                </button>
                <button
                  onClick={() => submitDecision("REJECTED")}
                  disabled={Boolean(submitting)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting === "REJECTED" ? "Submitting..." : "Reject"}
                </button>
              </div>

              {result && <p className="text-sm text-slate-300">{result}</p>}
            </section>
          ) : (
            <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 text-sm text-slate-300">
              <p>
                Decision: <span className="font-medium text-slate-100">{task.status}</span>
              </p>
              <p>Approver: {task.approver || "—"}</p>
              <p>Notes: {task.approver_notes || "—"}</p>
              {task.approved_at && <p>Approved at: {formatDateTime(task.approved_at)}</p>}
              {task.rejected_at && <p>Rejected at: {formatDateTime(task.rejected_at)}</p>}
            </section>
          )}
        </>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-slate-500">{label}:</span> {value}
    </p>
  );
}
