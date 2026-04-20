import { CreateImageCollectionOfProject } from "../controllers/project_images.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/projects/:projectId/images").post(verifyJwt,
    upload.array('images', 5),
    CreateImageCollectionOfProject)

export default router