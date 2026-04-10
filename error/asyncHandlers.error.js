const asyncHandler = (fn) => {async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({success:false , message: error.message})
        
    }
}}



export {asyncHandler}


// const asyncHandler2 = (requestHandler) =>{
//     (req,res,next) => {
//         return Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//     }
// }