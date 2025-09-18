'use client'
import { useState } from 'react'
import TwoPane from '../../components/TwoPane'
import CopyButton from '../../components/CopyButton'
import ApiKeyBar from '../../components/ApiKeyBar'
import { withBasePath } from '../../lib/routes'

export default function ObjectionsPage() {
  const [files, setFiles] = useState<File[]>([])
  const [question, setQuestion] = useState('Why is this more expensive than Competitor X?')
  const [indexing, setIndexing] = useState(false)
  const [asking, setAsking] = useState(false)
  const [indexResult, setIndexResult] = useState<any>(null)
  const [askResult, setAskResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [apiKey, setApiKey] = useState('')
  const [docs, setDocs] = useState<{ id:string; title:string }[]>([])

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []))
  }

  const indexDocs = async () => {
    setIndexing(true); setError(''); setIndexResult(null)
    try {
      if (files.length) {
        const fd = new FormData()
        for (const f of files) fd.append('files', f)
        const res = await fetch(withBasePath('/api/objections/index'), { method: 'POST', headers: { ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body: fd })
        const data = await res.json(); setIndexResult(data); if (!res.ok) setError(data?.error || 'Index failed'); setDocs(data?.docs || [])
      } else {
        const res = await fetch(withBasePath('/api/objections/index'), { method: 'POST', headers: { 'content-type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body: JSON.stringify({ files: [] }) })
        const data = await res.json(); setIndexResult(data); if (!res.ok) setError(data?.error || 'Index failed'); setDocs(data?.docs || [])
      }
    } catch (e: any) { setError(e?.message || 'Network error') } finally { setIndexing(false) }
  }

  const ask = async () => {
    setAsking(true); setError(''); setAskResult(null)
    try {
      const res = await fetch(withBasePath('/api/objections/ask'), { method: 'POST', headers: { 'content-type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body: JSON.stringify({ question }) })
      const data = await res.json(); setAskResult(data); if (!res.ok) setError(data?.error || 'Ask failed')
    } catch (e: any) { setError(e?.message || 'Network error') } finally { setAsking(false) }
  }

  const loadSample = async () => {
    setIndexResult(null); setAskResult(null); setError('')
    const r = await fetch(withBasePath('/api/samples/objections'))
    const d = await r.json()
    if (!r.ok) { setError(d?.error || 'Failed to load sample'); return }
    const res = await fetch(withBasePath('/api/objections/index'), { method: 'POST', headers: { 'content-type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body: JSON.stringify({ docs: d.docs }) })
    const data = await res.json(); setIndexResult(data); if (!res.ok) setError(data?.error || 'Index failed'); setDocs(data?.docs || [])
  }

  const left = (
    <div className="grid gap-3">
      <ApiKeyBar onChange={setApiKey} />
      <div>
        <label className="label">Upload Notes / PDFs</label>
        <input className="input" type="file" multiple onChange={onPick} />
        <div className="text-xs text-gray-600">{files.length ? `${files.length} file(s) selected` : 'No files selected'}</div>
        <div className="flex gap-2 mt-2">
          <button onClick={indexDocs} disabled={indexing} className="btn btn-primary">{indexing ? 'Indexing…' : 'Index to KB'}</button>
          <button type="button" onClick={loadSample} className="btn btn-ghost">Load Sample</button>
        </div>
      </div>
      <div>
        <label className="label">Ask an Objection</label>
        <textarea value={question} onChange={e=>setQuestion(e.target.value)} rows={4} className="input" />
        <button onClick={ask} disabled={asking} className="btn btn-primary mt-2">{asking ? 'Asking…' : 'Ask'}</button>
      </div>
    </div>
  )

  const right = (
    <div className="grid gap-3">
      {error && <div className="text-red-600">Error: {error}</div>}
      <div>
        <div className="font-semibold mb-1">Knowledge Base</div>
        {docs.length ? (
          <ul className="list-disc pl-5 text-sm text-gray-800">
            {docs.map(d => <li key={d.id}>{d.title}</li>)}
          </ul>
        ) : <div className="text-gray-600">No documents indexed yet.</div>}
      </div>
      <div>
        <div className="font-semibold mb-1">Answer</div>
        {askResult ? (
          <div className="space-y-3">
            {askResult.answer?.bullets && (
              <ul className="list-disc pl-5 text-sm text-gray-800">
                {askResult.answer.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
              </ul>
            )}
            {askResult.answer?.caveat && <div className="text-xs text-gray-600"><span className="font-medium">Caveat:</span> {askResult.answer.caveat}</div>}
            {askResult.answer?.talkTrack && <div className="text-sm"><span className="font-medium">Talk track:</span> {askResult.answer.talkTrack}</div>}
            {askResult.citations?.length ? (
              <div>
                <div className="text-sm font-medium">Citations</div>
                <ul className="list-disc pl-5 text-xs text-gray-700">
                  {askResult.citations.map((c: any, i: number) => <li key={i}>[{c.title}{c.page ? ` p.${c.page}` : ''}]</li>)}
                </ul>
              </div>
            ) : null}
            <details className="card p-2">
              <summary className="cursor-pointer text-sm font-medium">Matched snippets</summary>
              <div className="mt-2 space-y-2">
                {askResult.context?.map((c: any, i: number) => (
                  <div key={i} className="text-xs text-gray-700">
                    <div className="font-medium">{c.title}{c.page ? ` · p.${c.page}` : ''}</div>
                    <div className="whitespace-pre-wrap">{c.excerpt}</div>
                  </div>
                ))}
              </div>
            </details>
            <CopyButton text={JSON.stringify(askResult, null, 2)} />
          </div>
        ) : <div className="text-gray-600">Ask to see a response.</div>}
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold">Objection KB + RAG</h1>
      <p className="text-gray-600">Upload docs, then ask an objection. Citations and talk track TBD.</p>
      <TwoPane left={left} right={right} />
    </div>
  )
}
