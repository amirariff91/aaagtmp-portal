export type ContentStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "ERROR"
  | "PUBLISHED";

export interface ContentTask {
  id: string;
  run_id: string;
  opco: string;
  topic: string;
  platform: string;
  tone_profile: string;
  requester: string;
  draft_text: string | null;
  word_count: number | null;
  status: ContentStatus;
  model_used: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  approver: string | null;
  approver_notes: string | null;
  approved_at: string | null;
  rejected_at: string | null;
  approval_url: string | null;
  resume_webhook_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLogEntry {
  id: string;
  run_id: string | null;
  event_type: string;
  actor: string | null;
  opco: string | null;
  platform: string | null;
  topic: string | null;
  decision: string | null;
  notes: string | null;
  event_at: string;
}
