import { ApiError } from "../error/ApiErrors.error";
import { ApiResponse } from "../error/ApiResponse.error.js"
import { asyncHandler } from "../error/asyncHandlers.error";
import { SiteContent } from "../models/site_content.model";

const writeContent = asyncHandler(async (req,res) => {
    //deconstruct the sectionKey,contentValue,contentType from body
    //get user id from auth middlewhere using req.user?._id
    //verify the sections is empty or not
    //then find and update the section key content value and content type also user id  in the mongoose database 
    //if not their then create the data 
    //check the data is properly reached or not
    //send the success response and data back again

    const { sectionKey, contentValue, contentType } = req.body;

    user = req.user?._id;

    if ([sectionKey, contentType, contentValue].some((field) => !field || String(field).trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const updating = await SiteContent.findOneAndUpdate(
        {
            section_key: sectionKey,
            updated_by_admin_id: user
        },
        {
            content_value: contentValue,
            content_type: contentType
        },
        {
            upsert: true, // Creates the record if not found
            new: true     // Returns the updated document back to you
        }
    );

    if(updating==="" ||!updating || updating == null){
        throw new ApiError(500,"server error while creating and updating the content")
    }

    return res.status(200).json(new ApiResponse(200,updating,"The content saved successfully"))

})

const read = asyncHandler(async(req,res)=>{
    req.params()

})

export {
    writeContent,
    read
}