import mongoose from "mongoose";
import { USER } from "./userTypes";

const userSchema = new mongoose.Schema<USER>({
    name:{
        type:String,
        required:[true, "name is required"],
        minlength:[3, "name must be at least 3 characters long"],
        maxlength:[40, "name must be at most 40 characters long"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true, "password is required"],
        trim:true
    }
}, {timestamps:true});

export const UserModel = mongoose.model('User',userSchema);
