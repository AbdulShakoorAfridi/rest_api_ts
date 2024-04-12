import {Request,Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";



// register controller
// @access public
// @route POST /api/users/register


export const registerUser = async (req:Request, res:Response, next:NextFunction) => {

    const {name,email,password} = req.body;

    try {     
    //@ validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required.");
       return next(error);
    };
    //@ check if user exists
    const user = await UserModel.findOne({email});
    if(user){
        const error = createHttpError(400, "User already exists.");
        return next(error);
    };

    //@ hashed password
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    //@ create user
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword
    });

    //@ saving user in database
    const savedUser = await newUser.save();
    
    //@ token generation 
    const token = jwt.sign({
        _id: savedUser._id,
    }, config.JWT_SECRET as string, {
        expiresIn: "7d"
    });

        res.status(201).json({
            status:"success",
            message:"Register successfully",
            user:savedUser.name,
            accessToken:token
        });
    } catch (error) {
       return next(error);
    }

};



//@ login controller
// @ access public
// @ route POST /api/users/login


export const loginUser = async (req:Request, res:Response, next:NextFunction) => {

    const {email,password} = req.body;

    try {     
    //@ validation
    if(!email || !password){
        const error = createHttpError(400, "All fields are required.");
       return next(error);
    };

    //@ check if user doesn't exists
    const user = await UserModel.findOne({email});
    if(!user){
        const error = createHttpError(401, "User doesn't exists.");
        return next(error);
    };
    
    //@ verifying hashed password
    const comparePassword = bcrypt.compareSync(password, user.password);
    
    if(!comparePassword){
        const error = createHttpError(401, "email or password doesn't match.");
        return next(error);
    };
    
    //@access token generation 
    const token = jwt.sign({
        _id: user._id,
    }, config.JWT_SECRET as string, {
        expiresIn: "7d"
    });

        res.status(200).json({
            status:"success",
            message:"Login successfully",
            user:user.name,
            accessToken:token
        });
    } catch (error) {
       return next(error);
    }

};