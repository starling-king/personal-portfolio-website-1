import { asyncHandler } from "../error/asyncHandlers.error.js"
import { Admin } from "../models/admin_users.model.js"
import { ApiError } from "../error/ApiErrors.error.js"
import { ApiResponse } from "../error/ApiResponse.error.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await Admin.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    // validation check - not empty
    // check if user already exits:username,email
    // create user object - create entery in db
    // remove passwordHash and refresh token field from response
    // check for user creation 
    // return response


    // console.log("BODY:", req.body)

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

const loginUser = asyncHandler(async (req, res) => {

    // get username and password form user
    // find the user if not their then tell them to register
    // verify the username or email and hashed password
    // generate access token and refresh token
    // send cookies to user and response of login

    const { username, email, passwordHash } = req.body
    if (!(username || email)) {
        throw new ApiError(400, "username or password is required")
    }

    const user = await Admin.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "user not found please register")
    }

    const isPasswordValid = await user.isPasswordCorrect(passwordHash)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await Admin.findById(user._id).select("-passwordHash -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(200, { user: loggedInUser, accessToken }, "userloggedin successfully"))

})


const logoutUser = asyncHandler(async (req, res) => {
    //clear cookies
    //reset refresh token in the database
    await Admin.findByIdAndUpdate(
        req.user._id,
        {
            $set:
                refreshToken = undefined
        },
        { new: true }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "user logged out successfully")
        )

})


export {
    registerUser,
    loginUser,
    logoutUser
}