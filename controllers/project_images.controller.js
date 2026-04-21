import { Image } from "../models/project_images.model.js";
import { asyncHandler } from "../error/asyncHandlers.error.js";
import { ApiError } from "../error/ApiErrors.error.js";
import { ApiResponse } from "../error/ApiResponse.error.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from 'fs';

const CreateImageCollectionOfProject = asyncHandler(async (req, res) => {

try {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required in the URL parameters.");
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        throw new ApiError(400, "Please upload at least one image.");
    }

    const lastImage = await Image.findOne({ project_id: projectId }).sort({ sort_order: -1 });
    let currentSortOrder = lastImage ? lastImage.sort_order : 0;

    
    const uploadPromises = req.files.map(async (file) => {
        try {
            const uploadResult = await uploadOnCloudinary(file.path);
            
            
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            if (!uploadResult || !uploadResult.url) {
                throw new ApiError(500, `Failed to upload file ${file.originalname} to Cloudinary.`);
            }
            
            return uploadResult.url;
            
        } catch (uploadError) {
            
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw uploadError; 
        }
    });

    
    const imageUrls = await Promise.all(uploadPromises);

    
    const imageDocuments = imageUrls.map((url, index) => {
        return {
            project_id: projectId,
            image_url: url,
            alt_text: req.body.altText || `Project image ${currentSortOrder + index + 1}`,
            sort_order: currentSortOrder + index + 1
        };
    });

    
    const dataEntry = await Image.insertMany(imageDocuments);

   
    return res.status(201).json(new ApiResponse(200,dataEntry,`${imageDocuments.length} images uploaded successfully.`));

} catch (error) {
    const statusCode = error.statusCode || 500;
    throw new ApiError(statusCode, error.message || "Internal server error during image upload");
  }
})




export {
    CreateImageCollectionOfProject
}