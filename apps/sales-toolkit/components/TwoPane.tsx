'use client'
import React from 'react'

export default function TwoPane({ left, right }: { left: React.ReactNode, right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr] items-start">
      <div className="card p-4">{left}</div>
      <div className="card p-4 min-h-[200px]">{right}</div>
    </div>
  )
}
