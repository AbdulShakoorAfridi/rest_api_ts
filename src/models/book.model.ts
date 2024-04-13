import mongoose from "mongoose";
import { BOOK_TYPES } from "./bookTypes";


const bookSchema = new mongoose.Schema<BOOK_TYPES>({
    title:{
        type:String,
        required:[true, "title is required"],
        minlength:[3, "title must be at least 3 characters long"],
        maxlength:[40, "title must be at most 40 characters long"],
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "author name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "description is required"],
        trim:true,
    },
    genre:{
        type:String,
        enum:[
            "Science Fiction (Sci-Fi)",
            "Fantasy",
            "Mystery",
            "Thriller",
            "Romance",
            "Historical Fiction",
            "Horror",
            "Adventure",
            "Literary Fiction",
            "Young Adult (YA)"
          ],
        required:[true, "genre is required"],
        trim:true
    },
    coverImage:{
        type:String,
        required:[true, "cover image is required"],
    },
    file:{
        type:String,
        required:[true, "file is required"],
    }
}, {timestamps:true});

export const BookModel = mongoose.model('Book',bookSchema);
