import { ContentStatus } from "@/lib/types";

const statusStyles: Record<ContentStatus, string> = {
  PENDING_APPROVAL: "bg-amber-500/15 text-amber-300 ring-amber-500/40",
  APPROVED: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
  REJECTED: "bg-red-500/15 text-red-300 ring-red-500/40",
  ERROR: "bg-red-950 text-red-200 ring-red-800",
  PUBLISHED: "bg-blue-500/15 text-blue-300 ring-blue-500/40",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
