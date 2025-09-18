// Heuristics utilities placeholder
export function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

export function scoreICP(opts: { industry?: string; employees?: number; region?: string; tech?: string[] },
  weights = { industry: 40, size: 30, region: 10, tech: 20 }): number {
  // Placeholder only – replace with real rules
  let score = 0;
  if (opts.industry) score += weights.industry * 0.5;
  if (typeof opts.employees === 'number') score += weights.size * 0.5;
  if (opts.region) score += weights.region * 0.5;
  if (opts.tech && opts.tech.length) score += weights.tech * 0.5;
  return clamp(score);
}

