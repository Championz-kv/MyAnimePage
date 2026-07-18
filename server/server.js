import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import pool from "./db/database.js"
import animeRoutes from "./routes/animeRoutes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//dotenv.config()

const app = express()
app.use(express.static(path.join(__dirname, "../client")))

app.use(cors())
app.use(express.json())


// handle anime db requests at animeRoutes
app.use("/api/anime", animeRoutes)

const PORT = process.env.PORT || 3000

// server connection
async function startServer() {
    try {
        const result = await pool.query("SELECT NOW()")

        console.log("✓ Connected to PostgreSQL")
        console.log("Database time:", result.rows[0].now)

        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`)
        })
    }

    catch (err) {
        console.error("Database connection failed")
        console.error(err)
    }
}

startServer()