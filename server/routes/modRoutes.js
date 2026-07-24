import express from "express"
import {
  login,
  logout,
  session,
  getAllAnime,
  searchAnime,
  getAnimeById,
  getNextId,
  uploadMiddleware,
  uploadImage,
  getChanges,
  addChange,
  removeChange,
  commitChanges,
} from "../controllers/modController.js"
import { requireModAuth } from "../middleware/modAuth.js"

const router = express.Router()

// ---- auth (no guard on these three) ----
router.post("/login", login)
router.post("/logout", logout)
router.get("/session", session)

// ---- everything below requires an active mod session ----
router.use(requireModAuth)

router.get("/anime", getAllAnime)
router.get("/anime/search", searchAnime)
router.get("/anime/next-id", getNextId)
router.get("/anime/:id", getAnimeById)

router.post("/upload-image", uploadMiddleware, uploadImage)

router.get("/changes", getChanges)
router.post("/changes", addChange)
router.delete("/changes/:index", removeChange)
router.post("/changes/commit", commitChanges)

export default router
