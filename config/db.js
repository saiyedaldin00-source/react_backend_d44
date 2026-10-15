import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const url=process.env.USE_PROXY ===true
        ? process.env.MONGODB_URI_PROXY
        : process.env.MONGODB_URI
        const conn = await mongoose.connect(url)
        console.log(`connected success fully:${conn.connection.host}`)
    } catch(error){
        console.log(`connection error111:${error.message}`)
    }
}

export default connectDb
