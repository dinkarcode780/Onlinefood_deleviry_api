import mongoose from "mongoose";

export const databaseConnection = async()=>{

    const DB_URL = process.env.DB_URL ;

    await mongoose.connect(DB_URL).
    then(async()=>{console.log("Database connected successfully")

    }).
    catch((error)=>console.log( error.message));
};