import mongoose from "mongoose";

const connectDb = async () => {
    try {

        const uri=process.env.USE_PROXY === 'true'
        ? process.env.MONGODB_URI_PROXY
        : process.env.MONGODB_URI
        console.log(uri)
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected success fully:${conn.connection.host}`)
    } catch(error){
        console.log(`connection error111:${error.message}`)
    }
}

export default connectDb
