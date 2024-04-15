import express,{Request,Response,NextFunction} from "express";
import createHttpError, { HttpError } from "http-errors";
import cors from "cors";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import authRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes"
import { config } from "./config/config";


const app = express();

app.use(cors(
    {
        origin: config.FRONT_END_DOMIN,
        credentials: true,
    }
));

// @ middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/users",authRoutes)
app.use("/api/books",bookRoutes)
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