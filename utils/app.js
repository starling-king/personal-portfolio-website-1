import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

//routers import
import createAdminRouter from "../routers/admin_user.router.js"
import createSiteContent from "../routers/site_content.router.js"
import sendMessage from "../routers/contact_messages.router.js"

//router decleration
app.use("/api/v1/admin",createAdminRouter)
app.use("/api/v1/content",createSiteContent)
app.use("/api/v1/Message",sendMessage)

//setup global error
import globalError from "../error/global.error.js";
app.use(globalError);


export { app }
