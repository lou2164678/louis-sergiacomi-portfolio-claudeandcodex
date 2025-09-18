# #8 Competitive Battlecard AutoBuilder

## Vision / Value
Paste competitor docs/URLs + your product summary → generate a source-backed battlecard: at-a-glance pitch, feature/price compare, exploitables, defenses, top objections with citations, elevator per persona.

Primary users: AEs, SDRs, Enablement.

## Core flow
1. Upload/paste 1–4 competitors; select personas (SDR/AE/CS).
2. “Generate Battlecard.”
3. Output: summary, comparison table (price, integrations, time-to-value, ICP, unique), 3 exploitables, 3 defenses, 5 objection answers (with citations), persona elevators.
4. Export PDF; “Send to Objection KB” (one-click).

## Data model (TypeScript)
```ts
type CompetitorInput = { id:string; sourceType:'url'|'text'|'file'; title?:string; raw:string }
type Battlecard = {
  account?: string; personas: string[];
  summary: { ourPitch:string; competitorSummaries: {id:string; oneLine:string}[] };
  comparison: { metric:string; us:string; competitor:string }[];
  exploitables: string[]; defenses: string[];
  objections: { question:string; answer:string; citations:{title:string; page?:number}[] }[];
  elevatorByRole: { role:string; pitch:string }[];
  createdAt:string;
}
```

## API
`POST /api/battlecard/generate` → `{ ourSummary:string, competitors: CompetitorInput[], personas:string[] }` → `Battlecard`.

## Prompt skeleton
- System: “Sales enablement expert; concise, source-grounded; cite for claims.”
- User: Provide our summary + competitor chunks (each prefixed `[Doc:Title p.X]`); request strict `Battlecard` JSON.

## MVP backlog
- Upload + chunk/embeddings (optional: heuristics for price/features).
- Generation + table + citations; Export PDF; “Add to KB.”

## Success metrics
- <10s for 3 competitors; every claim cited or labeled “Not disclosed.”

## Risks & mitigations
- Missing pricing: mark “Not disclosed—source X,” never guess.
- Doc quality variance: show provenance panel with snippet preview.

## Stretch
- Side-by-side diff view; persona-specific counters; auto-update from URLs.

