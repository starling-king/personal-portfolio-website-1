import { ApiError } from "../error/ApiErrors.error.js";
import { ApiResponse } from "../error/ApiResponse.error.js";
import { asyncHandler } from "../error/asyncHandlers.error.js";
import slugify from "slugify"
import { Project } from "../models/Project.model.js";
// import { Admin } from "../models/admin_users.model.js";

const createProject = asyncHandler(async (req, res) => {
    //destructure the body of the form or the body 
    //verify everything
    //slugify using title
    //get the user id using req.user?._id
    //create project in database and store it

    try {

        const { title, category, description, problem, approach, solution, result, techStack, githubLink, liveLink, isFeatured, isPublished } = req.body

        const featured = JSON.parse(isFeatured || "false");
        const published = JSON.parse(isPublished || "false");

        // console.log(featured,published)

        if ([title, category, description].some(field => !field || field === "")) {
            throw new ApiError(400, "title category and discription are required field minimum")
        }


        if (featured && !published) {
            throw new ApiError(400, "this is required to have featured project also published")
        }

        if (published == true) {
            const requiredForPublish = [problem, approach, solution, result, techStack, liveLink];


            const isIncomplete = requiredForPublish.some(field =>
                !field || (Array.isArray(field) && field.length === 0) || field === "");

            if (isIncomplete) {
                throw new ApiError(
                    400,
                    "Cannot publish an incomplete draft. Please fill out problem, approach, solution, result, and tech stack,liveLink to publish. Otherwise, set isPublished to false to save as a draft."
                );
            }
        }

        const slug = slugify(title, {
            lower: true,
            strict: true,
            trim: true
        });

        const createProject = await Project.create({
            title: title,
            category: category,
            description: description,
            problem: problem,
            approach: approach,
            solution: solution,
            result: result,
            techStack: techStack,
            githubLink: githubLink,
            liveLink: liveLink,
            isFeatured: featured,
            isPublished: published,
            slug: slug,
            createdByAdminId: req.user?._id
        })

        return res.status(200).json(new ApiResponse(200, createProject, "The project created successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }

})

export {
    createProject
}