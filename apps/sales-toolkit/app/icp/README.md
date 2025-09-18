# #7 ICP Fit & Prioritization Scorer

## Vision / Value
Upload a CSV of accounts → get an ICP score 0–100, top 3 reasons, and a suggested first play. Practical prioritization with explainability.

Primary users: SDR managers, RevOps, AEs.

## Core flow
1. Upload CSV (`name,url,industry,employees,region`).
2. Rules + tiny LLM explainer → score & reasons.
3. Sort/filter/export; save “views.”

## Scoring heuristic (example)
- Industry allowlist (+40), size band fit (+30), region fit (+10), tech keyword matches (+20). Clamp 0–100.

## Schema (TypeScript)
```ts
type AccountIn = { name:string; url?:string; industry?:string; employees?:number; region?:string }
type Scored = AccountIn & { score:number; reasons:string[]; firstPlay:string }
```

## API
`POST /api/icp/score` → `{ rows: AccountIn[] }` → `{ rows: Scored[] }`.

## MVP backlog
- CSV import/export, table with sort/filters.
- Rule config JSON, explainer prompt.

## Success metrics
- Scores stable across runs; top reasons understandable; CSV round-trip clean.

## Risks & mitigations
- Overfit rules: expose weights in `/data/icp_rules.json`.

## Stretch
- Auto-enrich from website scrape, segment-specific playbooks.

