import Link from 'next/link';

const tools = [
  {
    href: '/brief',
    title: 'Autobrief Generator',
    description: 'Transform rough notes into structured discovery briefs with AI-assisted research enrichment.',
    bullets: ['Prompt engineered for MEDDIC style prep', 'Streaming responses with copy-ready sections'],
  },
  {
    href: '/objections',
    title: 'Objection Handling Coach',
    description: 'Surface tailored rebuttals grounded in past wins and competitive proof points.',
    bullets: ['RAG-powered answers with citations', 'Persona-aware tone guidance'],
  },
  {
    href: '/icp',
    title: 'ICP Fit & Scorer',
    description: 'Upload target account data to benchmark fit, spot gaps, and generate go-to-market plays.',
    bullets: ['Heuristic + embeddings scoring blend', 'Exportable insights for RevOps'],
  },
  {
    href: '/battlecard',
    title: 'Battlecard Studio',
    description: 'Generate comparative positioning, trap-setting questions, and differentiation angles on demand.',
    bullets: ['Competitor intel synthesis', 'Handles macros or pasted notes'],
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300">GTM Enablement • AI Ops • Revenue Intelligence</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
          AI Sales Toolkit
          <span className="block text-slate-300 text-xl md:text-2xl mt-3 font-light">
            Hands-on playground demonstrating how I design AI workflows for high-velocity sales teams.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-slate-100/80 text-base md:text-lg">
          Every module ships with product thinking, guardrails, and technical depth. Recruiters and hiring leaders can explore the live tools to see how I translate sales strategy into production-ready software.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/brief"
            className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
          >
            Start with Autobrief
          </Link>
          <a
            href="/"
            className="inline-flex items-center rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:border-white"
          >
            Return to Portfolio
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Explore the workflows</h2>
            <p className="text-slate-600">Each workspace is production-ready and mapped to real GTM motions.</p>
          </div>
          <span className="text-sm text-slate-500">Built with Next.js, TypeScript, Tailwind, and OpenAI APIs.</span>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex h-full flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Workspace</div>
                <h3 className="mt-2 text-xl font-semibold text-slate-900 group-hover:text-blue-600">{tool.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{tool.description}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                {tool.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Launch workspace
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 p-6 text-slate-600">
        <h3 className="text-lg font-semibold text-slate-900">How to evaluate the toolkit</h3>
        <p className="mt-3 text-sm leading-relaxed">
          I built these experiences to mirror the enablement gaps I see in the field. Feel free to run sample scenarios, change the inputs, and stress-test the guardrails. For questions about implementation details, reach out through the contact form in my portfolio.
        </p>
      </section>
    </div>
  );
}
