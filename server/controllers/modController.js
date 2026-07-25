import path from "path"
import multer from "multer"
import { createClient } from "@supabase/supabase-js"

import pool from "../db/database.js"

// -----------------------------------------------------------------------
// Image upload — goes to a Supabase Storage bucket instead of local disk,
// since Vercel's filesystem is read-only/ephemeral at runtime. Existing
// anime rows with "images/xxx.jpg" (served from client/images) keep
// working unchanged; only NEW uploads get a full Supabase URL instead.
// -----------------------------------------------------------------------
const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null
const BUCKET = process.env.SUPABASE_BUCKET || "anime-images"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed."))
    cb(null, true)
  },
})

export const uploadMiddleware = upload.single("image")

export function resolveImagePath(req, res) {
  if (!supabase) {
    return res.status(500).json({
      success: false,
      message: "Image storage isn't configured — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.",
    })
  }
  const filename = (req.query.filename || "").trim()
  if (!filename) return res.status(400).json({ success: false, message: "filename is required." })

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
  res.json({ success: true, path: data.publicUrl })
}

export async function uploadImage(req, res) {
  if (!supabase) {
    return res.status(500).json({
      success: false,
      message: "Image storage isn't configured — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.",
    })
  }
  if (!req.file) return res.status(400).json({ success: false, message: "No image received." })

  const ext = path.extname(req.file.originalname)
  const base = path
    .basename(req.file.originalname, ext)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image"

  let candidate = `${base}${ext}`
  let counter = 1

  try {
    while (true) {
      const { error } = await supabase.storage.from(BUCKET).upload(candidate, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      })
      if (!error) break

      const already = (error.message || "").toLowerCase().includes("exist") || error.statusCode === "409"
      if (!already) throw error

      candidate = `${base}-${counter}${ext}`
      counter++
      if (counter > 50) throw new Error("Too many filename collisions.")
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(candidate)
    res.json({ success: true, path: data.publicUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Image upload failed: " + err.message })
  }
}

// -----------------------------------------------------------------------
// Auth
// -----------------------------------------------------------------------
export function login(req, res) {
  const { username, password } = req.body
  if (username === process.env.MOD_USERNAME && password === process.env.MOD_PASSWORD) {
    req.session.isModAuthenticated = true
    return res.json({ success: true })
  }
  return res.status(401).json({ success: false, message: "Invalid username or password." })
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid")
    res.json({ success: true })
  })
}

export function session(req, res) {
  res.json({ loggedIn: !!(req.session && req.session.isModAuthenticated) })
}

// -----------------------------------------------------------------------
// Anime reads
// -----------------------------------------------------------------------
export async function getAllAnime(req, res) {
  try {
    const result = await pool.query("SELECT * FROM anime ORDER BY id ASC")
    res.json({ success: true, anime: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Failed to fetch anime." })
  }
}

export async function searchAnime(req, res) {
  const q = (req.query.q || "").trim()
  if (!q) return res.json({ success: true, results: [] })
  try {
    const isNumeric = /^\d+$/.test(q)
    const result = isNumeric
      ? await pool.query("SELECT id, name FROM anime WHERE id = $1 ORDER BY id ASC", [q])
      : await pool.query("SELECT id, name FROM anime WHERE name ILIKE $1 ORDER BY name ASC LIMIT 25", [`%${q}%`])
    res.json({ success: true, results: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Search failed." })
  }
}

export async function getAnimeById(req, res) {
  try {
    const result = await pool.query("SELECT * FROM anime WHERE id = $1", [req.params.id])
    if (!result.rows.length) return res.status(404).json({ success: false, message: "Anime not found." })
    res.json({ success: true, anime: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Failed to fetch anime." })
  }
}

// Estimates the ID the next INSERT would get, without consuming the
// sequence (a plain nextval() would burn a value even if the add is
// never actually committed). Also accounts for any "add" changes
// already staged this session, since those will consume sequence
// values first if committed together.
export async function getNextId(req, res) {
  try {
    const result = await pool.query("SELECT last_value, is_called FROM anime_id_seq")
    const { last_value, is_called } = result.rows[0]
    const baseNext = is_called ? Number(last_value) + 1 : Number(last_value)
    const stagedAdds = (req.session.changes || []).filter((c) => c.type === "add").length
    res.json({ success: true, nextId: baseNext + stagedAdds })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Failed to estimate next ID." })
  }
}

// -----------------------------------------------------------------------
// Staged changes — held in the session only, never touch the DB
// until /changes/commit is called.
// -----------------------------------------------------------------------
const ALLOWED_FIELDS = [
  "name", "image_path", "watched", "watching", "planned",
  "season", "status", "day", "current_episode", "total_episodes",
  "info", "release_month", "love_peace", "growth_adventure",
  "mind_psychology", "conflict_battle",
]

function sanitizeData(data) {
  if (!data) return null
  const clean = {}
  for (const key of Object.keys(data)) {
    if (ALLOWED_FIELDS.includes(key)) clean[key] = data[key]
  }
  return clean
}

export function getChanges(req, res) {
  if (!req.session.changes) req.session.changes = []
  res.json({ success: true, changes: req.session.changes })
}

export function addChange(req, res) {
  const { type, animeId, animeName, data } = req.body
  if (!["add", "edit", "delete"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid change type." })
  }
  if (!req.session.changes) req.session.changes = []

  req.session.changes.push({
    type,
    animeId: animeId ?? null,
    animeName: animeName || "(unnamed)",
    data: type === "delete" ? null : sanitizeData(data),
    stagedAt: new Date().toISOString(),
  })

  res.json({ success: true, changes: req.session.changes })
}

export function removeChange(req, res) {
  const index = parseInt(req.params.index, 10)
  if (!req.session.changes || !req.session.changes[index]) {
    return res.status(404).json({ success: false, message: "Change not found." })
  }
  req.session.changes.splice(index, 1)
  res.json({ success: true, changes: req.session.changes })
}

export async function commitChanges(req, res) {
  const changes = req.session.changes || []
  if (!changes.length) return res.status(400).json({ success: false, message: "No staged changes to commit." })

  const client = await pool.connect()
  try {
    await client.query("BEGIN")

    for (const change of changes) {
      if (change.type === "add") {
        const fields = Object.keys(change.data)
        const values = Object.values(change.data)
        const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ")
        await client.query(
          `INSERT INTO anime (${fields.join(", ")}) VALUES (${placeholders})`,
          values
        )
      } else if (change.type === "edit") {
        const fields = Object.keys(change.data)
        if (!fields.length) continue
        const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ")
        const values = Object.values(change.data)
        values.push(change.animeId)
        await client.query(
          `UPDATE anime SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length}`,
          values
        )
      } else if (change.type === "delete") {
        await client.query("DELETE FROM anime WHERE id = $1", [change.animeId])
      }
    }

    await client.query("COMMIT")
    req.session.changes = []
    res.json({ success: true, applied: changes.length })
  } catch (err) {
    await client.query("ROLLBACK")
    console.error(err)
    res.status(500).json({ success: false, message: "Commit failed — no changes were applied: " + err.message })
  } finally {
    client.release()
  }
}
