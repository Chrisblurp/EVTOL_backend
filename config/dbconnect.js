import mongoose from "mongoose";

import dotenv from "dotenv";


 const dbConnect = async () => {
    dotenv.config();
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected  succesfully')
    }
    catch(error){
        console.log(error.message);
        process.exit(1)
    }
}

export default dbConnect;