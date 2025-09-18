# B2B AI Sales Toolkit — Project Overviews (4 Tiles)

## Shared Foundation

- Stack: Next.js (App Router) + Tailwind, TypeScript, Node API routes, OpenAI (or compatible) LLMs.
- Local data/persistence: JSON files in `/data` (or SQLite via `better-sqlite3` if you prefer), file uploads to `/uploads`.
- Embeddings (when needed): In-memory vector store (cosine) using `float32array`, persisted to `/data/embeddings.json`.
- UX patterns: Single-page per tool → left input pane, right results pane; Copy, Export (PDF/CSV), “Load Sample,” “Clear,” and mini history.
- Security (demo mode): No external PII. All sample data synthetic. Guardrails to refuse unknown secrets/URLs if you want strictness.

## Repo layout

```
/apps/sales-toolkit
  /app
    /brief           # (#2)
    /objections      # (#4)
    /icp             # (#7)
    /battlecard      # (#8)
    /api
      /brief/generate.ts
      /objections/index.ts   /objections/ask.ts
      /icp/score.ts
      /battlecard/generate.ts
  /components        # shared UI
  /lib               # llm.ts, pdf.ts, csv.ts, embeddings.ts, heuristics.ts
  /data              # demo JSON, persisted briefs/snippets/vectors
  /uploads           # uploaded docs
```

---

## Tiles

Links to each tool’s folder for specs and implementation notes:

- AutoBrief (#2): `app/brief/`
- Objection KB + RAG (#4): `app/objections/`
- ICP Fit & Scorer (#7): `app/icp/`
- Battlecard AutoBuilder (#8): `app/battlecard/`

---

## Program Plan (2–3 focused sessions)

- Session A (scaffold + #2): Set up Next.js, shared UI, pdf/csv helpers, `/brief` end-to-end with samples.
- Session B (#4 RAG): Upload/index, retrieval, answer card with citations; save snippets.
- Session C (#7 + #8): CSV scorer & table; battlecard generation with comparison table; cross-link “Send to KB.”

## Demo script (portfolio)

1. Open AutoBrief → paste sample → 6 cards render → PDF.
2. Open Objection KB → upload 6 docs → ask “too expensive” → cited answer → add snippet.
3. Open ICP Scorer → upload CSV → sort by score → export.
4. Open Battlecard → 2 competitors → generate → show comparison and objection responses with citations → export.

## Outcome

Four highly relevant, interview-ready projects demonstrating: outbound prep, enablement via RAG, RevOps prioritization, and competitive positioning—each small enough to build quickly, yet meaty enough to showcase AI + sales judgment.

## LLM Configuration

1. Copy `.env.example` to `.env.local` inside `apps/sales-toolkit/` (the `.local` suffix is already git-ignored).
2. Populate the file with your provider credentials, e.g. `OPENAI_API_KEY=sk-...`.

Set environment variables (from `.env.local` or your shell) to enable real LLM calls:

- `OPENAI_API_KEY` — API key for OpenAI or compatible provider.
- `OPENAI_BASE_URL` — Optional. Defaults to `https://api.openai.com/v1`.
- `OPENAI_MODEL` — Chat model for JSON outputs. Defaults to `gpt-4o-mini`.
- `OPENAI_EMBEDDINGS_MODEL` — Embeddings model. Defaults to `text-embedding-3-small`.

APIs use JSON mode for structured outputs and the embeddings endpoint for Objection KB retrieval.

Using xAI Grok
- The AutoBrief endpoint now prefers xAI Grok by default without changing global `OPENAI_*` envs.
- Set these (or pass `x-api-key` from the UI):
  - `XAI_API_KEY` — xAI API key.
  - `XAI_BASE_URL` — Optional. Defaults to `https://api.x.ai/v1`.
  - `XAI_MODEL` — Optional. Defaults to `grok-code-fast-1`.
- For global Grok usage elsewhere, you can instead set `OPENAI_BASE_URL=https://api.x.ai/v1` and `OPENAI_MODEL=grok-code-fast-1`, but note that embeddings endpoints used by Objection KB expect an OpenAI‑compatible embeddings model.

OpenAI‑compatible proxy route
- `POST /api/ai/chat` proxies to any OpenAI‑compatible `/chat/completions`.
- Request body: `{ messages: [{role, content}], model?, temperature?, max_tokens?, response_format?, stream? }`.
- Send `x-api-key` header to avoid storing keys client‑side.

Per‑page API key entry
- Each tool page includes an “LLM API Key” bar at the top where users can paste their key. It is stored in localStorage and sent as `x-api-key` header for that page’s requests.
- This enables non-CLI users to try the tools without editing environment variables.

## Running this app standalone

From `apps/sales-toolkit/`:

- Install dependencies: npm install
- Dev server: npm run dev (defaults to http://localhost:3001)
- Build: npm run build
- Start prod: npm start

This sub-app maintains its own `package.json`, Tailwind and Next.js config.

## File uploads for Objection KB

- Supports `.txt`, `.md`, `.csv` natively (text parsed server-side).
- Attempts `.pdf` extraction if `pdf-parse` is installed. To enable:
  - npm install pdf-parse
  - Re-run the dev server. If missing, PDFs are accepted but treated as empty text.
