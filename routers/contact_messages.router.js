import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {SavetheDataOfForm,DiscoverMessage,markedData,TheInfo} from "../controllers/contact_messages.controller.js"

const router = Router()

router.route("/saveMessage/:username").post(SavetheDataOfForm)


export default router