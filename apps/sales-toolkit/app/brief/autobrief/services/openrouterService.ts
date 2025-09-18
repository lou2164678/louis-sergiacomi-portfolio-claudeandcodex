import type { CompanyBrief } from '../types';

export type ValidationIssue = { path: string; message: string };

export class ServiceError extends Error {
  status?: number;
  validation?: ValidationIssue[];
  constructor(message: string, opts?: { status?: number; validation?: ValidationIssue[] }) {
    super(message);
    this.name = 'ServiceError';
    this.status = opts?.status;
    this.validation = opts?.validation;
  }
}

export const generateCompanyBrief = async (companyName: string, apiKey?: string): Promise<CompanyBrief> => {
  if (!companyName) {
    throw new Error('Company name cannot be empty.');
  }

  try {
    const res = await fetch('/api/generate-brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) },
      body: JSON.stringify({ companyName })
    });

    if (!res.ok) {
      // Try to extract structured validation errors from JSON body
      let message = `Request failed: ${res.status} ${res.statusText}`;
      try {
        const errJson = await res.json();
        if (errJson?.error) message += ` - ${errJson.error}`;
        const validation: ValidationIssue[] | undefined = Array.isArray(errJson?.details)
          ? errJson.details.map((e: any) => {
              const ip = typeof e.instancePath === 'string' ? e.instancePath : '';
              const missing = e?.params?.missingProperty ? `.${e.params.missingProperty}` : '';
              const pathStr = (ip.replace(/^\//, '').replace(/\//g, '.') + missing) || '(root)';
              return {
                path: pathStr,
                message: typeof e.message === 'string' ? e.message : 'Invalid value'
              };
            })
          : undefined;
        throw new ServiceError(message, { status: res.status, validation });
      } catch {
        const bodyText = await res.text().catch(() => '');
        if (bodyText) message += ` - ${bodyText}`;
        throw new ServiceError(message, { status: res.status });
      }
    }

    const data = await res.json();
    return data as CompanyBrief;
  } catch (error) {
    console.error('Error generating company brief via backend:', error);
    if (error instanceof ServiceError) throw error;
    const message = error instanceof Error ? error.message : String(error);
    throw new ServiceError(`Network error contacting backend: ${message}`);
  }
};
