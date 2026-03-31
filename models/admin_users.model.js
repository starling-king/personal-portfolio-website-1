import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    passwordHash:{
        type:String,
        required:true 
    },
    lastLogin:{
        type:Date
    }

},{timestamps:true})

export const Admin = mongoose.model("Admin",adminSchema)
