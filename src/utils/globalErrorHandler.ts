
import express,{Request,Response,NextFunction} from "express";
import createHttpError, { HttpError } from "http-errors";
// import { CustomError } from "../middleware/CustomError";
import { config } from "../config/config";

const devErrors = (res:Response, error:HttpError) => {
    res.status(error.statusCode).json({
        status: error.statusCode >= 400 &&  error.statusCode < 500 ? "error" :"failed",
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

const castErrorHandler = (err:HttpError) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`
    return createHttpError(400, msg);
}

const duplicateKeyErrorHandler = (err:HttpError) => {
 const name = err.keyValue.name;
 const msg = `${name} already exist in the database. Please use another name!`;
 
 return createHttpError(400, msg);
}

const validationErrorHandler = (err:HttpError) => {
    

    const errors = Object.values(err.errors).map((val:any) => (
        val.message
    ));
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;

    return createHttpError(400, msg);
}

const prodErrors = (res:Response, error:HttpError) => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.'
        })
    }
}

export const globalErrorHandler = (error:HttpError, req:Request, res:Response, next:NextFunction) => {

    error.statusCode = error.statusCode || 500;

    
    if(config.NODE_ENV === 'development'){
        devErrors(res, error);
    } else if(config.NODE_ENV === 'production'){
        if(error.name === 'CastError'){
           
            error = castErrorHandler(error);
        } 
        if(error.code === 11000) {
            error = duplicateKeyErrorHandler(error);
        }
        if(error.name === 'ValidationError'){
            error = validationErrorHandler(error);
        } 
        prodErrors(res, error);
    }
}