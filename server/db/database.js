import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

// If DATABASE_URL is set (Supabase, Neon, Railway, etc. all give you one),
// use that. Otherwise fall back to the individual DB_* vars for local dev.
// Hosted providers require SSL.
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    })
    : new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    })

export default pool