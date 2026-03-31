import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    },
    problem:{
        type:String
    },
    approach:{
        type:String
    },
    solution:{
        type:String
    },
    result:{
        type:String
    },
    techStack: [
    {
        type: String,
        lowercase: true,
        trim: true
    }
],
    githubLink:{
        type:String
    },
    liveLink:{
        type:String
    },
    createdByAdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }
},{timestamps:true})
export const Project = mongoose.model("Project",projectSchema)