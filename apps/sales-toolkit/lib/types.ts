// Shared TypeScript types for the four tools

export interface Brief {
  id: string;
  companyName: string;
  sourceType: 'url' | 'text';
  industry?: string;
  segment?: 'SMB' | 'MM' | 'ENT';
  firmographics: { hq?: string; size?: string; revenue?: string; tech_stack?: string[] };
  pains: string[];
  discovery: string[];
  valueProps: string[];
  expansion: string[];
  meddicc: { metrics?: string[]; economicBuyer?: string; decisionCriteria?: string[]; risks?: string[] };
  rawSources: { url?: string; text?: string };
  createdAt: string;
}

export interface Doc { id: string; title: string; pages?: number }
export interface Chunk { id: string; docId: string; page?: number; text: string; embedding: number[] }
export interface Snippet { id: string; question: string; answer: string; citations: { title: string; page?: number }[] }

export type AccountIn = { name: string; url?: string; industry?: string; employees?: number; region?: string }
export type Scored = AccountIn & { score: number; reasons: string[]; firstPlay: string }

export type CompetitorInput = { id: string; sourceType: 'url' | 'text' | 'file'; title?: string; raw: string }
export type Battlecard = {
  account?: string; personas: string[];
  summary: { ourPitch: string; competitorSummaries: { id: string; oneLine: string }[] };
  comparison: { metric: string; us: string; competitor: string }[];
  exploitables: string[]; defenses: string[];
  objections: { question: string; answer: string; citations: { title: string; page?: number }[] }[];
  elevatorByRole: { role: string; pitch: string }[];
  createdAt: string;
}

