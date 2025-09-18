const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/apps/sales-toolkit';

export const withBasePath = (path: string) => `${BASE_PATH}${path}`;
