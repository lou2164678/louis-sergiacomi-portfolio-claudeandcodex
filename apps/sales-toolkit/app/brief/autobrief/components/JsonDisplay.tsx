import React, { useState, useCallback } from 'react';
import ClipboardIcon from '../icons/ClipboardIcon';
import CheckIcon from '../icons/CheckIcon';

interface JsonDisplayProps {
    data: object;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
    const [isCopied, setIsCopied] = useState(false);
    const jsonString = JSON.stringify(data, null, 2);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(jsonString).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [jsonString]);

    const filename = (() => {
        try {
            const anyData = data as any;
            const name = anyData?.company_profile?.overview?.company_name as string | undefined;
            if (name && typeof name === 'string') return `${name.trim().replace(/\s+/g,'_').toLowerCase()}_brief.json`;
        } catch {}
        return 'company_brief.json';
    })();

    const handleDownload = useCallback(() => {
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }, [jsonString, filename]);

    return (
        <div className="bg-slate-950/70 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                <p className="text-sm font-medium text-slate-300">Generated JSON Brief</p>
                <div className="flex items-center gap-4">
                  <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
                  >
                      Download
                  </button>
                  <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
                  >
                      {isCopied ? (
                          <>
                             <CheckIcon />
                             Copied!
                          </>
                      ) : (
                          <>
                              <ClipboardIcon />
                              Copy
                          </>
                      )}
                  </button>
                </div>
            </div>
            <div className="p-4 max-h-[60vh] overflow-auto">
                <pre>
                    <code className="text-sm text-white whitespace-pre-wrap break-all">
                        {jsonString}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default JsonDisplay;
