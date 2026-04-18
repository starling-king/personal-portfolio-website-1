import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { createProject } from "../controllers/Project.controller.js";

const router = Router()

router.route("/createProject").post(verifyJwt,createProject)

export default router