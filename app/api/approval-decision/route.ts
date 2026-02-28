import { NextResponse } from "next/server";

type ApprovalPayload = {
  webhookUrl?: string;
  decision?: "APPROVED" | "REJECTED";
  approver?: string;
  notes?: string;
};

export async function POST(req: Request) {
  let payload: ApprovalPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload.webhookUrl || !payload.decision || !payload.approver) {
    return NextResponse.json(
      { error: "webhookUrl, decision, and approver are required" },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(payload.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        decision: payload.decision,
        approver: payload.approver,
        notes: payload.notes || "",
      }),
    });

    if (!upstream.ok) {
      const body = await upstream.text();
      return NextResponse.json(
        {
          error: `Upstream rejected decision (${upstream.status}).`,
          details: body,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
