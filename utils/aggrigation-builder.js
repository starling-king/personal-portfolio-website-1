// import { asyncHandler } from "../error/asyncHandlers.error"

const buildProjectPipeline = (matchConditions) => {
    return [
        {
            $match: matchConditions 
        },
        {
            $lookup: {
                from: "images",
                localField: "_id",
                foreignField: "projectId",
                as: "images" 
            }
        },
        {
            $project: {
                __v: 0,
                "images.__v": 0,
                "images.projectId": 0,
                "images.createdAt": 0,
                "images.updatedAt": 0
            }
        }
    ];
};

export{ buildProjectPipeline }