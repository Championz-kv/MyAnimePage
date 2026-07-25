import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import session from "express-session"
import connectPgSimple from "connect-pg-simple"

import pool from "./db/database.js"
import animeRoutes from "./routes/animeRoutes.js"
import modRoutes from "./routes/modRoutes.js"
import { requireModAuthPage } from "./middleware/modAuth.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//dotenv.config()

const app = express()

// required behind Vercel's proxy for secure cookies to work correctly
app.set("trust proxy", 1)

app.use(cors())
app.use(express.json())

const PgSession = connectPgSimple(session)

// session for the mod/admin panel (single fixed login, see /mod)
// Stored in Postgres (not memory) — required on Vercel, since serverless
// functions don't share memory between invocations. Auto-creates its
// own "session" table on first run.
app.use(
    session({
        store: new PgSession({
            pool,
            tableName: "session",
            createTableIfMissing: true,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // stay logged in for a year
            secure: process.env.NODE_ENV === "production", // requires HTTPS in prod
        },
    })
)

// mod panel API
app.use("/api/mod", modRoutes)

// mod panel pages — registered before express.static so they're never
// shadowed by the static folder's own directory-redirect behavior
app.get("/mod", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/mod/index.html"))
})
app.get("/mod/editor", requireModAuthPage, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/mod/editor.html"))
})

app.use(express.static(path.join(__dirname, "../client")))

// handle anime db requests at animeRoutes
app.use("/api/anime", animeRoutes)

const PORT = process.env.PORT || 3000

// server connection
async function startServer() {
    try {
        const result = await pool.query("SELECT NOW()")

        console.log("✓ Connected to PostgreSQL")
        console.log("Database time:", result.rows[0].now)

        // On Vercel, the platform invokes the exported app directly per
        // request — it must NOT call app.listen itself.
        if (!process.env.VERCEL) {
            app.listen(PORT, () => {
                console.log(`✓ Server running on port ${PORT}`)
            })
        }
    }

    catch (err) {
        console.error("Database connection failed")
        console.error(err)
    }
}

startServer()

export default app