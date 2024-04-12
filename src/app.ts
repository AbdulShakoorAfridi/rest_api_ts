import express,{Request,Response,NextFunction} from "express";
import createHttpError, { HttpError } from "http-errors";
// import { CustomError } from "./middleware/CustomError";
import { globalErrorHandler } from "./utils/globalErrorHandler";


const app = express();



// http method
app.get("/", (req, res) => {
  res.status(200).json({
    message: "mastering REST API CH ",
  });
});


app.get("*", (req, res,next) => {
    const error = createHttpError( 404,`not found ${req.url}`);
    next(error);
});

// global error handler middleware
app.use(globalErrorHandler)

// app.use((error:HttpError,req:Request,res:Response,next:NextFunction) =>{
    
//     const statusCode = error.statusCode || 500;
//     const message = error.message || "Internal Server Error";

//     res.status(statusCode).json({
//         error: {
//             status: statusCode >=400 ? "error" : "failed",
//             message: message
//         }
//     })
// })

export default app;