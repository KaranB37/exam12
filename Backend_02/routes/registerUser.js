import express from "express"
import { registerUser } from "../controllers/registerUser.js"

const router = express.Router()

router.post("/", registerUser)
router.get("/", (req, res) => {
    res.send("Users")
})

export default router;