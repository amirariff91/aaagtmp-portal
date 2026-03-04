import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — AAAGTMP",
  description:
    "AAAGTMP is Aurion's AI GTM platform. Learn how the agent system, governance model, and approval gate work.",
};

const steps = [
  {
    num: "01",
    title: "You send a task",
    desc: 'Via WhatsApp, in plain language. "Draft a LinkedIn post for DARA about our Q1 priorities." No special commands needed.',
  },
  {
    num: "02",
    title: "The agent drafts",
    desc: "It draws on Aurion's accumulated memory: past communications, brand voice, stakeholder context, approved positions. It produces a draft in seconds.",
  },
  {
    num: "03",
    title: "Human review",
    desc: "The draft appears in the governance portal. It goes nowhere until a designated approver reads it and explicitly approves. No auto-publish. No bypass.",
  },
  {
    num: "04",
    title: "Approved and logged",
    desc: "The approval is recorded permanently: who approved, when, which version. Only then does the output publish to the connected channel.",
  },
];

const agents = [
  {
    name: "HQ Orchestrator",
    desc: "The coordinator. Receives your instructions and routes tasks to the right specialist.",
  },
  {
    name: "Content Agent",
    desc: "Drafts LinkedIn posts, press releases, stakeholder updates — in your brand voice.",
  },
  {
    name: "Research Agent",
    desc: "Monitors competitors, tracks industry news, surfaces relevant intelligence.",
  },
  {
    name: "Meeting Prep",
    desc: "Prepares briefing documents before important meetings.",
  },
  {
    name: "DARA Intel",
    desc: "Specialist intelligence for the DARA operating company.",
  },
  {
    name: "AurionID Agent",
    desc: "Handles identity and compliance-related communications.",
  },
  {
    name: "Pilot Tracker",
    desc: "Tracks the status of active pilot programmes across OpCos.",
  },
  {
    name: "CRM Agent",
    desc: "Updates and maintains stakeholder relationship records.",
  },
  {
    name: "Regulatory Watch",
    desc: "Monitors regulatory developments relevant to Aurion's markets.",
  },
  {
    name: "Cross-OpCo Relay",
    desc: "Coordinates information sharing across operating companies where appropriate.",
  },
  {
    name: "LinkedIn Intel",
    desc: "Monitors LinkedIn for signals from target stakeholders and partners.",
  },
  {
    name: "Community Intel",
    desc: "Tracks relevant online communities and discussion threads.",
  },
  {
    name: "Signal Trigger",
    desc: "Detects time-sensitive signals that require immediate attention.",
  },
  {
    name: "AEO + SEO Agent",
    desc: "Manages search visibility and answer engine positioning.",
  },
  {
    name: "Voice + Video Agent",
    desc: "Handles voice and video content production workflows.",
  },
  {
    name: "Intent Signal Agent",
    desc: "Identifies and tracks buying intent signals from prospects.",
  },
];

const opcos = [
  {
    name: "DARA",
    desc: "Institutional digital asset intelligence.",
    audience: "Sovereign funds, regulators, institutional investors.",
  },
  {
    name: "Digital Aurion (SentienFi)",
    desc: "Consumer financial education.",
    audience: "Mass market across Southeast Asia.",
  },
  {
    name: "Aurion Kendall",
    desc: "High-net-worth advisory.",
    audience: "Family offices and private wealth.",
  },
  {
    name: "AurionID",
    desc: "Digital identity and compliance infrastructure.",
    audience: "Regulators, enterprises, and government bodies.",
  },
  {
    name: "Aurion Mirai",
    desc: "Smart cities and government infrastructure.",
    audience: "Government agencies and municipal authorities.",
  },
];

const faqs = [
  {
    q: "Does it post to LinkedIn automatically?",
    a: "No. Every post requires explicit human approval before it publishes. The agent drafts; a human decides.",
  },
  {
    q: "Where does Aurion's data live?",
    a: "On infrastructure Aurion controls. Not on shared cloud platforms or US-based SaaS servers.",
  },
  {
    q: "Can it learn our specific brand voice?",
    a: "Yes — that is the point. The onboarding process loads your prior communications, brand guidelines, and approved messaging into the agent's memory. It begins informed, not blank.",
  },
  {
    q: "What if the agent gets something wrong?",
    a: "The approval gate catches it. If an approver rejects a draft or requests changes, that correction feeds back into the agent's memory — it learns from the feedback.",
  },
  {
    q: "How long does onboarding take?",
    a: "Two weeks for the initial memory seeding. The agent is operational in production by week three.",
  },
  {
    q: "Is this the same as using ChatGPT or Copilot?",
    a: "No. General AI tools are designed for individual use, start from scratch each session, and have no governance layer. AAAGTMP is institutional infrastructure — built for one organisation, with compounding memory, mandatory human approval, and a permanent audit trail.",
  },
];

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(15,118,110,0.3), transparent)",
        }}
      />
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main
      style={{ backgroundColor: "#0A0A0F", color: "#F1F5F9" }}
      className="min-h-screen"
    >
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(15,118,110,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          {/* Wordmark */}
          <div className="mb-12">
            <p
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
              style={{ color: "#0F766E" }}
            >
              AAAGTMP
            </p>
            <p className="text-sm tracking-[0.2em] text-slate-500">
              Aurion AI GTM Platform
            </p>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 max-w-3xl mx-auto"
            style={{ letterSpacing: "-0.02em" }}
          >
            You just watched it work.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
            Here's how — explained for humans, not engineers.
          </p>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-3 text-slate-600">
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <div
              className="w-px h-12"
              style={{
                background: "linear-gradient(to bottom, #0F766E, transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── THE SIMPLE VERSION ─── */}
      <section className="max-w-3xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-10 font-medium"
          style={{ color: "#0F766E" }}
        >
          The Simple Version
        </p>
        <div className="space-y-7 text-lg leading-relaxed text-slate-300">
          <p>
            AAAGTMP is a team of AI assistants built specifically for Aurion's
            five operating companies. Each one understands your business, your
            audience, and the way you communicate.
          </p>
          <p>
            They handle content creation, external communications, and business
            intelligence — continuously, around the clock, without requiring
            your team to stop what they're doing.
          </p>
          <p>
            Nothing they produce goes public until a human reviews it and
            explicitly approves it. That is not a feature. That is how the
            system is built.
          </p>
        </div>
      </section>

      <Divider />

      {/* ─── 4-STEP FLOW ─── */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#0F766E" }}
        >
          How It Works
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-16 text-white">
          Four steps. Every time.
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl p-8 border"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background:
                  "linear-gradient(135deg, rgba(15,118,110,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              <div
                className="text-5xl font-thin mb-5 leading-none"
                style={{ color: "#0F766E" }}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ─── GOVERNANCE MODEL ─── */}
      <section className="max-w-3xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#0F766E" }}
        >
          The Governance Model
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-white">
          Every output has a human signature.
        </h2>

        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
          <p>
            The approval gate is not a feature added on top of the platform. It
            is the architecture. Nothing moves without it. There is no setting
            to disable it. There is no bypass.
          </p>
          <p>
            Every external communication produced by the system carries a chain
            of custody — a permanent record of who requested it, what the agent
            produced, who reviewed it, and when they approved it. For
            regulators, board governance, and institutional partners, that
            record exists and can be produced on demand.
          </p>

          <blockquote
            className="my-10 pl-7 py-1 text-xl font-light italic text-slate-200 border-l-2"
            style={{ borderColor: "#0F766E" }}
          >
            "Think of it like a contract that requires a countersignature. The
            AI is the drafter. The human is the signatory. Nothing is binding
            until the signatory acts."
          </blockquote>
        </div>
      </section>

      <Divider />

      {/* ─── MEMORY ADVANTAGE ─── */}
      <section className="max-w-3xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#0F766E" }}
        >
          The Memory Advantage
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-white">
          It gets smarter the longer it runs.
        </h2>

        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
          <p>
            Most AI tools start from scratch every time. You re-explain the
            context. You re-paste the background. You re-set the tone. Then you
            do it again tomorrow.
          </p>
          <p>
            AAAGTMP builds memory. Every approved output, every correction,
            every stakeholder interaction feeds back into the agent's knowledge
            base. It does not reset. It accumulates.
          </p>
          <p>
            After 90 days, the agent understands Aurion's tone, positions, and
            sensitivities better than most new hires would after six months on
            the job. The difference: it doesn't forget, and it's available at
            3am.
          </p>
          <p className="text-white font-medium">
            That institutional knowledge belongs to Aurion — not to any vendor.
            It lives on your infrastructure. It moves with you.
          </p>
        </div>
      </section>

      <Divider />

      {/* ─── 16 AGENTS ─── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#0F766E" }}
        >
          The System
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-3 text-white">
          16 specialist agents.
        </h2>
        <p className="text-slate-400 mb-16 text-lg">
          Each one built for a specific job. None of them generalist.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-lg p-5 border"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "#5EEAD4" }}
              >
                {agent.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {agent.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ─── 5 OPERATING COMPANIES ─── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#0F766E" }}
        >
          Where It Operates
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-3 text-white">
          Five operating companies. One platform.
        </h2>
        <p className="text-slate-400 mb-16 text-lg">
          Each OpCo has dedicated agents, dedicated memory, and dedicated
          governance.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {opcos.map((opco) => (
            <div
              key={opco.name}
              className="rounded-xl p-8 border"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background:
                  "linear-gradient(135deg, rgba(15,118,110,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {opco.name}
              </h3>
              <p className="text-slate-300 mb-5 leading-relaxed">{opco.desc}</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                <span style={{ color: "#0F766E" }} className="font-medium">
                  Audience —{" "}
                </span>
                {opco.audience}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ─── FAQ ─── */}
      <section className="max-w-3xl mx-auto px-6 py-28">
        <p
          className="text-xs tracking-[0.35em] uppercase mb-4 font-medium"
          style={{ color: "#0F766E" }}
        >
          Questions
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-16 text-white">
          Common questions, straight answers.
        </h2>

        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {faqs.map((faq) => (
            <div key={faq.q} className="py-10">
              <h3 className="text-lg font-medium text-white mb-4">{faq.q}</h3>
              <p className="text-slate-400 leading-relaxed text-base">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="border-t py-10 px-6 text-center"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs text-slate-600 tracking-wide">
          AAAGTMP | Aurion AI GTM Platform | Confidential — for authorised
          stakeholders only | March 2026
        </p>
      </footer>
    </main>
  );
}
