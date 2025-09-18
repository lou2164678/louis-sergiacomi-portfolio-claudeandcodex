'use client'
import { useState } from 'react'
import TwoPane from '../../components/TwoPane'
import CopyButton from '../../components/CopyButton'
import ApiKeyBar from '../../components/ApiKeyBar'

type Row = Record<string, string>

function parseCSVSafely(text: string): Row[] {
  // Minimal CSV parser for demo: no quotes/escapes handling
  const lines = text.split(/\r?\n/).filter(Boolean)
  if (!lines.length) return []
  const headers = lines[0].split(',').map(h=>h.trim())
  return lines.slice(1).map(line => {
    const vals = line.split(',')
    const row: Row = {}
    headers.forEach((h, i) => row[h] = (vals[i] ?? '').trim())
    return row
  })
}

export default function ICPPage() {
  const [file, setFile] = useState<File | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [scored, setScored] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [apiKey, setApiKey] = useState('')

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f); setScored(null); setError('')
    if (f) {
      const text = await f.text()
      setRows(parseCSVSafely(text))
    } else setRows([])
  }

  const score = async () => {
    setLoading(true); setError(''); setScored(null)
    try {
      const bodyRows = rows.map(r => ({
        name: r.name,
        url: r.url || undefined,
        industry: r.industry || undefined,
        employees: r.employees ? Number(r.employees) : undefined,
        region: r.region || undefined,
      }))
      const res = await fetch('/api/icp/score', { method: 'POST', headers: { 'content-type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body: JSON.stringify({ rows: bodyRows }) })
      const data = await res.json(); setScored(data); if (!res.ok) setError(data?.error || 'Score failed')
    } catch (e: any) { setError(e?.message || 'Network error') } finally { setLoading(false) }
  }

  const loadSample = async () => {
    setError(''); setScored(null)
    const res = await fetch('/api/samples/icp')
    const data = await res.json()
    if (res.ok) setRows(data.rows)
    else setError(data?.error || 'Failed to load sample')
  }

  const left = (
    <div className="grid gap-3">
      <ApiKeyBar onChange={setApiKey} />
      <div>
        <label className="label">Upload CSV</label>
        <input className="input" type="file" accept=".csv" onChange={onPick} />
        <div className="text-xs text-gray-600">{file ? file.name : 'No file selected'}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={score} disabled={!rows.length || loading} className="btn btn-primary">{loading ? 'Scoring…' : 'Score'}</button>
        <button type="button" onClick={loadSample} className="btn btn-ghost">Load Sample</button>
      </div>
      {!!rows.length && (
        <div className="border-t pt-2">
          <div className="font-semibold mb-1">Preview ({rows.length} rows)</div>
          <pre className="m-0 max-h-40 overflow-auto">{JSON.stringify(rows.slice(0, 10), null, 2)}</pre>
        </div>
      )}
    </div>
  )

  const right = (
    <div>
      {error && <div className="text-red-600 mb-2">Error: {error}</div>}
      {!scored && !error && <div className="text-gray-600">Scored results will appear here.</div>}
      {scored && (
        <>
          <CopyButton text={JSON.stringify(scored, null, 2)} />
          <pre className="m-0 overflow-auto">{JSON.stringify(scored, null, 2)}</pre>
        </>
      )}
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">ICP Fit & Prioritization Scorer</h1>
      <p className="text-gray-600">Upload CSV of accounts → get scores, reasons, and first play.</p>
      <TwoPane left={left} right={right} />
    </div>
  )
}
