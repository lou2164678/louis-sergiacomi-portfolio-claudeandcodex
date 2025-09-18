'use client'
import { useState } from 'react'
import TwoPane from '../../components/TwoPane'
import CopyButton from '../../components/CopyButton'
import ApiKeyBar from '../../components/ApiKeyBar'
import { withBasePath } from '../../lib/routes'

type Competitor = { id: string; sourceType: 'url'|'text'|'file'; title?: string; raw: string }

export default function BattlecardPage() {
  const [ourSummary, setOurSummary] = useState('We help revenue teams consolidate tooling with faster time-to-value and strong integrations.')
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: 'c1', sourceType: 'text', title: 'Competitor A', raw: 'Competitor A focuses on enterprise with premium pricing and SSO/SCIM.' },
  ])
  const [personas, setPersonas] = useState<string[]>(['AE'])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [apiKey, setApiKey] = useState('')

  const togglePersona = (p: string) => setPersonas(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev, p])

  const updateCompetitor = (i: number, patch: Partial<Competitor>) => {
    setCompetitors(prev => prev.map((c, idx) => idx===i ? { ...c, ...patch } : c))
  }

  const addCompetitor = () => setCompetitors(prev => [...prev, { id: `c${prev.length+1}`, sourceType: 'text', title: '', raw: '' }])
  const removeCompetitor = (i: number) => setCompetitors(prev => prev.filter((_, idx) => idx !== i))

  const loadSample = () => {
    setOurSummary('Consolidate enablement workflows with fast rollout, enterprise security, and deep integrations to reduce TCO and speed up cycles.')
    setCompetitors([
      { id: 'c1', sourceType: 'text', title: 'AlphaCorp', raw: 'Enterprise-first platform with custom pricing, strong reporting, and SSO/SCIM. Longer deployments.' },
      { id: 'c2', sourceType: 'text', title: 'BetaSuite', raw: 'Starter-friendly pricing, limited integrations. Focus on SMB with quick setup.' }
    ])
    setPersonas(['SDR', 'AE', 'CS'])
    setResult(null); setError('')
  }

  const generate = async () => {
    setLoading(true); setError(''); setResult(null)
    try {
      const payload = { ourSummary, competitors, personas }
      const res = await fetch(withBasePath('/api/battlecard/generate'), { method: 'POST', headers: { 'content-type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body: JSON.stringify(payload) })
      const data = await res.json(); setResult(data); if (!res.ok) setError(data?.error || 'Generation failed')
    } catch (e: any) { setError(e?.message || 'Network error') } finally { setLoading(false) }
  }

  const left = (
    <div className="grid gap-3">
      <ApiKeyBar onChange={setApiKey} />
      <div>
        <label className="label">Our Product Summary</label>
        <textarea value={ourSummary} onChange={e=>setOurSummary(e.target.value)} rows={4} className="input" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="label">Competitors</label>
          <button type="button" onClick={addCompetitor} className="btn btn-ghost">Add</button>
        </div>
        <div className="grid gap-2">
          {competitors.map((c, i) => (
            <div key={c.id} className="card p-2">
              <div className="grid grid-cols-[1fr_120px_80px] gap-2 items-center">
                <input value={c.title || ''} onChange={e=>updateCompetitor(i, { title: e.target.value })} placeholder="Title" className="input" />
                <select value={c.sourceType} onChange={e=>updateCompetitor(i, { sourceType: e.target.value as any })} className="input">
                  <option value="text">text</option>
                  <option value="url">url</option>
                  <option value="file" disabled>file</option>
                </select>
                <button type="button" onClick={()=>removeCompetitor(i)} className="btn btn-ghost">Remove</button>
              </div>
              <textarea value={c.raw} onChange={e=>updateCompetitor(i, { raw: e.target.value })} rows={3} placeholder={c.sourceType==='url' ? 'https://...' : 'Paste text or notes'} className="input mt-2" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Personas</label>
        <div className="flex gap-3">
          {['SDR','AE','CS'].map(p => (
            <label key={p} className="flex gap-1 items-center">
              <input type="checkbox" checked={personas.includes(p)} onChange={()=>togglePersona(p)} /> {p}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={generate} disabled={loading} className="btn btn-primary">{loading ? 'Generating…' : 'Generate Battlecard'}</button>
        <button type="button" onClick={loadSample} className="btn btn-ghost">Load Sample</button>
      </div>
    </div>
  )

  const right = (
    <div>
      {error && <div className="text-red-600 mb-2">Error: {error}</div>}
      {!result && !error && <div className="text-gray-600">Generated battlecard will appear here as JSON.</div>}
      {result && (
        <>
          <CopyButton text={JSON.stringify(result, null, 2)} />
          <pre className="m-0 overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </>
      )}
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">Competitive Battlecard AutoBuilder</h1>
      <p className="text-gray-600">Summaries + competitors → comparison, exploitables/defenses, and objections with citations.</p>
      <TwoPane left={left} right={right} />
    </div>
  )
}
