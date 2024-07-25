import express from "express"
import { loginUser } from "../controllers/loginUser.js"

const router = express.Router()

router.post("/", loginUser)

export default router;