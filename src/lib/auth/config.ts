import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { nextCookies } from 'better-auth/next-js';
import { serverEnv } from '@/data/serverEnv';
import { db } from '@/db/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
  appName: 'rag-ai',
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
  trustedOrigins: [serverEnv.BETTER_AUTH_URL],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    // The Neon HTTP driver has no interactive transactions.
    transaction: false,
  }),
  socialProviders: {
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    data: {
      generateId: "uuid",
    },
  },
  // Keeps cookies set by server actions / server components. Must stay last.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
