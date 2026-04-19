import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { createProject,getAllAdminProjects,getAdminProjectBySlug,updateProject,deleteProject } from "../controllers/Project.controller.js";

const router = Router()

router.route("/createProject").post(verifyJwt,createProject)
router.route("/getAllAdminProjects").get(verifyJwt,getAllAdminProjects)
router.route("/getAdminProjectBySlug/:Id").get(verifyJwt,getAdminProjectBySlug)
router.route("/updateProject/:id").patch(verifyJwt,updateProject)
router.route("/deleteProject/:id").delete(verifyJwt,deleteProject)

export default router