import express,{Request,Response,NextFunction} from "express";
import createHttpError, { HttpError } from "http-errors";
// import { CustomError } from "./middleware/CustomError";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import router from "./routes/user.routes";


const app = express();

// @ middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users",router)
//@ http method
app.get("/", (req, res) => {
  res.status(200).json({
    message: "mastering REST API",
  });
});

// @ 404 Not Found Route 
app.all("*", (req, res,next) => {
    const error = createHttpError( 404,`not found ${req.url}`);
    next(error);
});

// @ global error handler middleware
app.use(globalErrorHandler)

export default app;