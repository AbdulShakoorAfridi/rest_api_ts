import mongoose from "mongoose";
import {config} from "./config";

const connectDB = async () =>{
    try{
        
        mongoose.connection.on("connected", ()=>{
            console.log("connected to database");
        });
        mongoose.connection.on("disconnected", ()=>{
            console.log("disconnected from database");
        });
        mongoose.connection.on("error", (err)=>{
            console.log("error connecting to database: " + err);
        });

        const conn = await mongoose.connect(config.db_url as string);

    }catch(err){
        console.log("Failed to connect to database :" + err);
        process.exit(1);
    }
}

export default connectDB;