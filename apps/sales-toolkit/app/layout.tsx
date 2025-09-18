import Link from 'next/link';
import './globals.css';

export const metadata = { title: 'B2B AI Sales Toolkit', description: 'Four sales enablement tools' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="font-extrabold text-lg tracking-tight">AI Sales Toolkit</Link>
              <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Built for GTM teams
              </span>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <Link href="/brief" className="hover:text-slate-900">AutoBrief</Link>
              <Link href="/objections" className="hover:text-slate-900">Objection Coach</Link>
              <Link href="/icp" className="hover:text-slate-900">ICP Scorer</Link>
              <Link href="/battlecard" className="hover:text-slate-900">Battlecard Studio</Link>
              <a href="/" className="ml-2 text-blue-600 hover:text-blue-800">Back to Portfolio</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
