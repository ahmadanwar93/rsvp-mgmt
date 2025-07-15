import 'server-only'
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This is how Next JS (our app that is API routes, server components etc) read and write data

const sql = neon(process.env.DATABASE_URL!)
// we have to pass schema to drizzle for type safety purpose, else has to do raw SQL
export const db = drizzle(sql, { schema });
