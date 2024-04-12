import {HttpError} from "http-errors";


export class CustomError extends HttpError {
  statusCode: number;
  isOperational: boolean
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
    }
  }