'use client'
import { useState } from 'react'

export default function CopyButton({ text, label = 'Copy JSON' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false), 1200) } catch {}
  }
  return <button className="btn btn-ghost mb-2" onClick={copy}>{copied ? 'Copied!' : label}</button>
}

