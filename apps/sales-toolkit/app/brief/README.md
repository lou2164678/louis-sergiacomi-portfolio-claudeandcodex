# #2 Account Research AutoBrief

## Vision / Value
Paste a URL or company blurb → get a one-pager for pre-call prep (Firmographics, Pain Hypotheses, 5 Discovery Qs, 3 Value Props, 2 Land-&-Expand plays, MEDDICC pre-fill). Shortens research time and raises first-call quality.

Primary users: SDRs, AEs, Sales Leaders (coaching), RevOps.

## Core flow
1. Input: URL or company text (+ optional industry/segment).
2. “Generate Brief” → LLM synthesis (light heuristics to extract size/stack).
3. Output cards + Copy/PDF + Save to history.

## Data model (TypeScript)
```ts
export interface Brief {
  id: string; companyName: string; sourceType: 'url'|'text';
  industry?: string; segment?: 'SMB'|'MM'|'ENT';
  firmographics: { hq?: string; size?: string; revenue?: string; tech_stack?: string[] };
  pains: string[]; discovery: string[]; valueProps: string[]; expansion: string[];
  meddicc: { metrics?: string[]; economicBuyer?: string; decisionCriteria?: string[]; risks?: string[] };
  rawSources: { url?: string; text?: string }; createdAt: string;
}
```

## API
`POST /api/brief/generate` → `{ input: { url?: string, text?: string, industry?, segment? } }` → `Brief`.

## Prompt skeleton
- System: “You are a B2B sales strategist. Output concise, non-fluffy bullets. Use only provided context.”
- User: Provide industry/segment + text; request the fields in the `Brief` schema, JSON only.

## MVP backlog (2–4h)
- Page + form, JSON render → cards.
- Copy/PDF export.
- 5 sample blurbs; mini history.

## Success metrics (demo)
- ≤10s generation, JSON valid, sections non-empty.
- Users can copy or export with 1 click.

## Risks & mitigations
- Hallucinated numbers: mark unsure fields as “Unknown (not in source).”

## Stretch
- URL scrape helper, MEDDICC editor, CRM field mapper.

