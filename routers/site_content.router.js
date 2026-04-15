import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {writeContent} from "../controllers/site_content.controller.js"

const router = Router()
router.route("/writeContent").post(verifyJwt,writeContent)


export default router