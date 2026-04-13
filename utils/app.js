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


//router decleration
app.use("/api/v1/admin",createAdminRouter)



export { app }
