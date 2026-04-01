import mongoose from "mongoose";
const connectDB = async() =>{
    try {
        const conncetionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`\n MongoDb connected !! DB host:${conncetionInstance.connection.host}`)
    } catch (error) {
        console.error("MONGODB connection error: ",error)
        // throw error
        process.exit(1)
    }
}

export default connectDB