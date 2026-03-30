import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({})
export const Image = mongoose.model("Image",imageSchema)