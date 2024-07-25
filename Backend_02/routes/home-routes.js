import express from "express"
import { generatePdf, homeView } from "../controllers/generateLetters.js"


const router = express.Router()

router.get('/', homeView)
router.post("/download", generatePdf)

export default router;