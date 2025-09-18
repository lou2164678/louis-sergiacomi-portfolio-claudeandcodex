'use client'
import { useEffect, useState } from 'react'

export default function ApiKeyBar({ storageKey = 'llm_api_key', onChange }: { storageKey?: string; onChange?: (key: string) => void }) {
  const [apiKey, setApiKey] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const k = localStorage.getItem(storageKey) || ''
    setApiKey(k)
    onChange?.(k)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  const save = () => {
    localStorage.setItem(storageKey, apiKey)
    onChange?.(apiKey)
  }

  return (
    <div className="card p-3 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">LLM API Key</div>
          <div className="text-xs text-gray-600">Stored locally in your browser. Used for this page’s requests.</div>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="input w-72"
            type={visible ? 'text' : 'password'}
            placeholder="sk-..."
            value={apiKey}
            onChange={e=>setApiKey(e.target.value)}
          />
          <button className="btn btn-ghost" onClick={()=>setVisible(v=>!v)}>{visible ? 'Hide' : 'Show'}</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}

