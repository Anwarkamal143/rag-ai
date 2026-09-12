import { drizzle } from 'drizzle-orm/neon-http';
import { serverEnv } from '@/data/serverEnv';
import { relations } from './retaions';
import { authRelations } from './schemas/auth';

export const db = drizzle(serverEnv.DATABASE_URL, { relations: {...relations, ...authRelations} });
