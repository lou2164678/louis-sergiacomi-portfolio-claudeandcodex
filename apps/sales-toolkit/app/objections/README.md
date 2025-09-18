# #4 Objection KB + RAG Playground

## Vision / Value
Upload product notes/FAQs/one-pagers → ask objection → get a concise answer with citations and a short talk track. Turns scattered docs into high-confidence, coachable answers.

Primary users: AEs, SEs, Enablement.

## Core flow
1. Upload 5–10 PDFs/notes (or paste text).
2. Ask: “Too expensive vs X?”
3. Answer (3 bullets), caveat, 3–4 line talk track, citations; “Add to Snippets.”

## Indexing
- Chunk (≈800 tokens, 200 overlap), embed, store `{id, docId, page, text, embedding}`.

## RAG prompt
- System: “Sales enablement coach; answer only from chunks; always show citations `[Title p.X]`.”
- User: Provide question + top-k chunks; request structured output: bullets, caveat, talk-track, citations.

## Models (TypeScript)
```ts
export interface Doc { id: string; title: string; pages?: number }
export interface Chunk { id: string; docId: string; page?: number; text: string; embedding: number[] }
export interface Snippet { id:string; question:string; answer:string; citations:{title:string; page?:number}[] }
```

## APIs
- `POST /api/objections/index` (ingest).
- `POST /api/objections/ask` (retrieve+LLM).

## MVP backlog
- File upload + chunk/embed; top-k retrieval.
- Answer card with citations; Save snippet.

## Success metrics
- Sources always present; empty-KB guard; ≤12s latency.

## Risks & mitigations
- Source mismatch: show the matched text excerpt inline; allow “Add to KB” correction.

## Stretch
- Multi-doc diff, versioning, “confidence meter.”

