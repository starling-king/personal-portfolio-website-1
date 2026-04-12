import { asyncHandler } from "../error/asyncHandlers.error.js"
import { Admin } from "../models/admin_users.model.js"
import { ApiError } from "../error/ApiErrors.error.js"
import { ApiResponse } from "../error/ApiResponse.error.js"

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    // validation check - not empty
    // check if user already exits:username,email
    // create user object - create entery in db
    // remove passwordHash and refresh token field from response
    // check for user creation 
    // return response

    const { username, email, passwordHash } = req.body


    if (
        [username, email, passwordHash].some(
            (field) => !field || String(field).trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }


    const exitingUser = await Admin.findOne({
        $or: [{ username }, { email }]
    })

    if (exitingUser) {
        throw new ApiError(409, "user email and username already exist")
    }

    const admin = await Admin.create({
        username: username.toLowerCase(),
        email,
        passwordHash
    })

    const UserCreated = await Admin.findById(admin._id).select(
        "-passwordHash -refreshToken"
    )

    if (!UserCreated) {
        throw new ApiError(500, "Something went wrong while restering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, UserCreated, "User registered successfully")
    )

})




export { registerUser }