export const metadata = { title: 'B2B AI Sales Toolkit', description: 'Four sales enablement tools' };
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
            <a href="/" className="font-extrabold text-lg">Sales Toolkit</a>
            <nav className="flex gap-3 text-sm">
              <a href="/brief" className="hover:underline">AutoBrief</a>
              <a href="/objections" className="hover:underline">Objection KB</a>
              <a href="/icp" className="hover:underline">ICP Scorer</a>
              <a href="/battlecard" className="hover:underline">Battlecard</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
