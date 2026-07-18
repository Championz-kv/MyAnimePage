import pool from "../db/database.js"

export async function getAllAnime(req, res) {
    console.log("GET /api/anime")

    try {
        const result = await pool.query(`
            SELECT *
            FROM anime
            ORDER BY name
        `)

        res.json(result.rows)
    }

    catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch anime"
        })
    }
}