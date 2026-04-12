import {asyncHandler} from "../error/asyncHandlers.error.js"

const registerUser = asyncHandler( async (req,res) => {  
    res.status(404).json({
        message:"ayush mishra"
    })

} )




export{registerUser}