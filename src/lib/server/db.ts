import postgres from "postgres";

export const db = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });