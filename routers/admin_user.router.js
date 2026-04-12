import { Router } from "express";
import { registerUser } from "../controllers/admin_user.controller.js";

const router = Router()

router.route("/register").post(registerUser)


export default router