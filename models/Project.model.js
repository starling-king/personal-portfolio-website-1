import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        index:true,
        trim:true
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
        type:String,
        trim:true,
        dafault:null
    },
    liveLink:{
        type:String,
        trim: true,
        required:true
    },
    createdByAdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }
},{timestamps:true})

projectSchema.index({ is_published: 1, is_featured: 1 });//compound indexing
projectSchema.index({ createdByAdminId: 1,is_published: 1, slug: 1 }, { unique: true });//scope unique indexing 

export const Project = mongoose.model("Project",projectSchema)