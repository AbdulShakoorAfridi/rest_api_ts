import {Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../config/config";


export interface AuthRequest extends Request {
    userId: string;
}



export const authenticationVerification = (req:Request,res:Response,next:NextFunction) =>{

    const token = req.header('Authorization');
    if(!token){
        return next(createHttpError(401,"Authentication Required"));
    }


    const parsedToken = token.split(' ')[1];
    const {JWT_SECRET} = config;
    const decodedToken = jwt.verify(parsedToken,JWT_SECRET as string) as JwtPayload;

    if(!decodedToken){
        return next(createHttpError(401,"Authentication failed due to invalid credentials."));
    }

    const _req = req as AuthRequest;

    _req.userId = decodedToken._id as string;

    next();
    
}