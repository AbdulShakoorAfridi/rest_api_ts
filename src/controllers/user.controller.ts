import {Request,Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../models/users.model";


export const registerUser = async (req:Request, res:Response, next:NextFunction) => {

    const {name,email,password} = req.body;

    try {     
    // validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required.");
       return next(error);
    };
    // check if user exists
    const user = await UserModel.findOne({email});
    if(user){
        const error = createHttpError(400, "User already exists.");
        return next(error);
    };
    // create user
    const newUser = new UserModel({
        name,
        email,
        password
    });
    // save user
    const savedUser = await newUser.save();

        res.status(201).json({
            status:"success",
            message:"Register successfully",
            user:savedUser
        })
    } catch (error) {
        next(error);
    }

}