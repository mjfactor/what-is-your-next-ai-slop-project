// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { NeonDialect } from "kysely-neon"

const dialect = new NeonDialect({
    connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
    database: {
        dialect,
        type: 'postgres',
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
}); 