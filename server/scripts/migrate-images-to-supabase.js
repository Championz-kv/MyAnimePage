// One-off migration: uploads every image currently referenced by the
// anime table (files sitting in client/images/, e.g. "images/86.jpg")
// into your Supabase bucket, then updates each row's image_path to the
// new public URL — so old and new entries are stored the same way.
//
// Safe to re-run: uses upsert, and skips rows that are already a full
// URL (i.e. already migrated).
//
// Run from the server/ folder, with your real .env in place:
//   node scripts/migrate-images-to-supabase.js

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"
import pool from "../db/database.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLIENT_DIR = path.join(__dirname, "..", "..", "client")
const BUCKET = process.env.SUPABASE_BUCKET || "anime-images"

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env — aborting.")
  process.exit(1)
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

function guessContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === ".png") return "image/png"
  if (ext === ".webp") return "image/webp"
  if (ext === ".gif") return "image/gif"
  return "image/jpeg"
}

async function main() {
  const { rows } = await pool.query(
    "SELECT id, name, image_path FROM anime WHERE image_path IS NOT NULL AND image_path <> '' ORDER BY id"
  )

  const toMigrate = rows.filter((r) => !/^https?:\/\//i.test(r.image_path))
  console.log(`Found ${rows.length} anime with an image_path, ${toMigrate.length} still local.`)

  let migrated = 0
  let skipped = 0
  let failed = 0

  for (const row of toMigrate) {
    const localPath = path.join(CLIENT_DIR, row.image_path) // image_path is like "images/86.jpg"
    const bucketFilename = path.basename(row.image_path)

    if (!fs.existsSync(localPath)) {
      console.warn(`✗ [${row.id}] ${row.name}: local file not found at ${localPath}, skipping.`)
      skipped++
      continue
    }

    try {
      const buffer = fs.readFileSync(localPath)

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(bucketFilename, buffer, {
        contentType: guessContentType(localPath),
        upsert: true, // safe to re-run
      })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(bucketFilename)

      await pool.query("UPDATE anime SET image_path = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [
        data.publicUrl,
        row.id,
      ])

      console.log(`✓ [${row.id}] ${row.name} -> ${data.publicUrl}`)
      migrated++
    } catch (err) {
      console.error(`✗ [${row.id}] ${row.name}: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. Migrated: ${migrated}, skipped (file missing): ${skipped}, failed: ${failed}.`)
  await pool.end()
}

main().catch((err) => {
  console.error("Migration script crashed:", err)
  process.exit(1)
})
