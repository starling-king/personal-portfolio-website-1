import { Image } from "../models/project_images.model.js";
import { asyncHandler } from "../error/asyncHandlers.error.js";
import { ApiError } from "../error/ApiErrors.error.js";
import { ApiResponse } from "../error/ApiResponse.error.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const CreateImageCollectionOfProject = asyncHandler(async(req,res)=>{
    try {
        //get project id from parameter deconstruct it and verify it
        //upload the image on cloudinary and get the url
        //create the database record including sorting order, and project id also userid
        //send the response to the user including url

        const { projectId } = req.param

        if(!projectId){
            throw new ApiError(400,"projectId is required look at the project lists")
        }

        const imageLocalpath = req.files[0]?.path
        
        if(!imageLocalpath){
            throw new ApiError("please upload images for slideshow")
        }

        const imagesUrl = await uploadOnCloudinary(imageLocalpath)

        if(!imagesUrl){
            throw new ApiError(400,"please upload images for slideshow")
        }

        const dataentery = await Image.create({
            
        })


    } catch (error) {
        const statuscode = error.statuscode || 500
        throw new ApiError(statuscode,error.message || "internal server error")
    }
})



export{
    CreateImageCollectionOfProject
}