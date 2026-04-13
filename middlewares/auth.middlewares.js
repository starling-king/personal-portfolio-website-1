import { ApiError } from "../error/ApiErrors.error";
import { asyncHandler } from "../error/asyncHandlers.error";
import { jwt } from "jsonwebtoken"
import { Admin } from "../models/admin_users.model";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        if (!token) {
            throw new ApiError(401, "unauthorized request")
        }

        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await Admin.findById(decoded?._id).select("-passwordHash -refreshToken")

        if (!user) {
            throw new ApiError(401, "invalid access token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
    }
})