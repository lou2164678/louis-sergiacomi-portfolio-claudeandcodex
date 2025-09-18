export default function Home() {
  const tile = (href: string, title: string, desc: string) => (
    <a href={href} className="card p-4 no-underline">
      <div className="font-bold mb-1">{title}</div>
      <div className="text-gray-600 leading-snug">{desc}</div>
    </a>
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tile('/brief', 'Account Research AutoBrief', 'Paste URL or blurb → one-pager for pre-call prep.')}
      {tile('/objections', 'Objection KB + RAG', 'Upload notes, ask objection → cited answer + talk track.')}
      {tile('/icp', 'ICP Fit & Scorer', 'Upload CSV → score 0–100 with reasons and first play.')}
      {tile('/battlecard', 'Battlecard AutoBuilder', 'Summaries + competitors → comparison & objections with citations.')}
    </div>
  );
}
