import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({})
export const Message = mongoose.model("Message",messageSchema)