import dotenv from 'dotenv';
import path from 'path';

/**
 * Carga variables desde `.env` en la raíz del proyecto (archivo gitignored).
 * En CI/Codespaces, las variables ya presentes en process.env no se sobrescriben.
 */
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const DEFAULT_BASE_URL = 'http://localhost:3100';

export const env = {
  baseURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
} as const;
