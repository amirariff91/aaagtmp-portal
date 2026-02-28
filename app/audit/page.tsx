import { Suspense } from "react";
import { AuditClient } from "./audit-client";

export default function AuditPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 text-sm text-slate-300">
          Loading audit page...
        </div>
      }
    >
      <AuditClient />
    </Suspense>
  );
}
