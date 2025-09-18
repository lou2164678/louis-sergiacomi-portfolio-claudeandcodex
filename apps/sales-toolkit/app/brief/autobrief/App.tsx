import React, { useState, useCallback } from 'react';
import type { CompanyBrief } from './types';
import { generateCompanyBrief, ServiceError, type ValidationIssue } from './services/openrouterService';
import Loader from './components/Loader';
import JsonDisplay from './components/JsonDisplay';
import ApiKeyBar from '../../../components/ApiKeyBar';
import { withBasePath } from '../../../lib/routes';

const App: React.FC = () => {
    const [companyName, setCompanyName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorDetails, setErrorDetails] = useState<ValidationIssue[] | null>(null);
    const [briefData, setBriefData] = useState<CompanyBrief | null>(null);
    const [apiKey, setApiKey] = useState<string>('');

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!companyName.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setBriefData(null);
        setErrorDetails(null);

        try {
            const result = await generateCompanyBrief(companyName, apiKey);
            setBriefData(result);
        } catch (err) {
            console.error(err);
            if (err instanceof ServiceError) {
                setError(err.message);
                setErrorDetails(err.validation || null);
            } else {
                setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console for details.');
                setErrorDetails(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, [companyName, isLoading]);

    const [saving, setSaving] = useState(false)
    const [savedMsg, setSavedMsg] = useState<string | null>(null)

    const saveBrief = useCallback(async () => {
        if (!briefData) return
        setSaving(true); setSavedMsg(null)
        try {
            const res = await fetch(withBasePath('/api/brief/save'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ brief: briefData }) })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || 'Save failed')
            setSavedMsg(`Saved (id: ${data.id})`)
            setTimeout(()=>setSavedMsg(null), 2500)
        } catch (e: any) {
            setSavedMsg(e?.message || 'Save failed')
        } finally { setSaving(false) }
    }, [briefData])

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                        AI Company Brief Generator
                    </h1>
                    <p className="text-lg text-slate-400">
                        Enter a company name to generate an evidence-based, comprehensive brief in JSON format.
                    </p>
                </header>

                <main>
                    <div className="bg-slate-800/50 rounded-lg p-6 shadow-2xl backdrop-blur-sm border border-slate-700 mb-8">
                        <ApiKeyBar onChange={setApiKey} />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="company-name" className="block text-sm font-medium text-slate-300 mb-2">
                                Company Name
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    id="company-name"
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="e.g., 'Nvidia' or 'OpenAI'"
                                    className="flex-grow bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !companyName.trim()}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition duration-200"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader />
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate Brief'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 min-h-[300px]">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center text-center text-slate-400">
                                <Loader />
                                <p className="mt-4 text-lg">Researching and compiling brief for <span className="font-bold text-white">{companyName}</span>...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg space-y-2" role="alert">
                                <div>
                                  <strong className="font-bold">Error: </strong>
                                  <span className="sm:inline">{error}</span>
                                </div>
                                {errorDetails && errorDetails.length > 0 && (
                                  <ul className="list-disc list-inside text-red-200 text-sm space-y-1">
                                    {errorDetails.slice(0, 10).map((d, idx) => (
                                      <li key={idx}>
                                        <span className="font-mono text-red-100">{d.path || '(root)'}:</span> {d.message}
                                      </li>
                                    ))}
                                    {errorDetails.length > 10 && (
                                      <li>…and {errorDetails.length - 10} more issues</li>
                                    )}
                                  </ul>
                                )}
                            </div>
                        )}
                        {briefData && (
                           <>
                             <div className="mb-3 flex items-center gap-3">
                               <button onClick={saveBrief} disabled={saving} className="inline-flex items-center justify-center px-4 py-2 border border-slate-600 text-sm rounded-md shadow-sm text-white bg-slate-700 hover:bg-slate-600 disabled:opacity-60">
                                 {saving ? 'Saving…' : 'Save Brief'}
                               </button>
                               {savedMsg && <div className="text-xs text-slate-300">{savedMsg}</div>}
                             </div>
                             <JsonDisplay data={briefData} />
                           </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
