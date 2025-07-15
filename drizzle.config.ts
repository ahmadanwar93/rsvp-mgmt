import {defineConfig} from 'drizzle-kit'
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
    schema:'./src/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})

// basically this is just a migration tool, where it will manage (create or update tables) of our database