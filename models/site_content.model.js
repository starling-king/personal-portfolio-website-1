import mongoose from "mongoose";
const siteContentSchema = new mongoose.Schema({})
export const SiteContent = mongoose.model("SiteContent",siteContentSchema)