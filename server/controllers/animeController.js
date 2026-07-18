import pool from "../db/database.js"

export async function getAllAnime(req, res) {

    try {
        const result = await pool.query(
            `SELECT * FROM anime ORDER BY name`
        )

        res.json(result.rows)
    }

    catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch anime"
        })
    }
}

export async function getAnimeById(req, res) {

  try {

    const { id } = req.params
    const result = await pool.query(
      `SELECT * FROM anime WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Anime not found"
      })
    res.json(result.rows[0])
  }

  catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Server error"
    })
  }
}

export async function createAnime(req, res) {

  try {

    const {
      name,
      image_path,
      watched,
      watching,
      planned,
      season,
      status,
      day,
      current_episode,
      total_episodes,
      info,
      release_month,
      love_peace,
      growth_adventure,
      mind_psychology,
      conflict_battle
    } = req.body

    const result = await pool.query(
      `
      INSERT INTO anime
      (
        name,
        image_path,
        watched,
        watching,
        planned,
        season,
        status,
        day,
        current_episode,
        total_episodes,
        info,
        release_month,
        love_peace,
        growth_adventure,
        mind_psychology,
        conflict_battle
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,
        $9,$10,$11,$12,$13,$14,$15,$16
      )
      RETURNING *
      `,
      [
        name,
        image_path,
        watched,
        watching,
        planned,
        season,
        status,
        day,
        current_episode,
        total_episodes,
        info,
        release_month,
        love_peace,
        growth_adventure,
        mind_psychology,
        conflict_battle
      ]
    )
    res.status(201).json(result.rows[0])
  }

  catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Server error"
    })
  }
}

export async function updateAnime(req, res) {

  try {

    const { id } = req.params
    const {
      name,
      image_path,
      watched,
      watching,
      planned,
      season,
      status,
      day,
      current_episode,
      total_episodes,
      info,
      release_month,
      love_peace,
      growth_adventure,
      mind_psychology,
      conflict_battle
    } = req.body

    const result = await pool.query(
      `
      UPDATE anime
      SET
      name = $1,
      image_path = $2,
      watched = $3,
      watching = $4,
      planned = $5,
      season = $6,
      status = $7,
      day = $8,
      current_episode = $9,
      total_episodes = $10,
      info = $11,
      release_month = $12,
      love_peace = $13,
      growth_adventure = $14,
      mind_psychology = $15,
      conflict_battle = $16,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = $17
      RETURNING *
      `,
      [
        name,
        image_path,
        watched,
        watching,
        planned,
        season,
        status,
        day,
        current_episode,
        total_episodes,
        info,
        release_month,
        love_peace,
        growth_adventure,
        mind_psychology,
        conflict_battle,
        id
      ]
    )

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Anime not found"
      })
    res.json(result.rows[0])
  }

  catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Server error"
    })
  }
}

export async function deleteAnime(req, res) {

  try {

    const { id } = req.params
    const result = await pool.query(
      `
      DELETE FROM anime
      WHERE id = $1
      RETURNING *
      `,
      [id]
    )

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Anime not found"
      })
    res.json({
      message: "Anime deleted"
    })
  }

  catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Server error"
    })
  }
}