import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/admin_user.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
// import { upload } from "../middlewares/multer.middlewares.js"

const router = Router()

router.route("/register").post(
    registerUser
)

router.route("/login").post(loginUser)

//secure section
router.route("/logout").post(verifyJwt,logoutUser)
export default router