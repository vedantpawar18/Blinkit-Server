import mongoose from "mongoose";

export const connectDb = async (uri) =>{
    try{
        await mongoose.connect(uri);
        console.log("DB Connected ✅")
    }
    catch(err){
        console.log("Database connection failed :", err)
    }
}