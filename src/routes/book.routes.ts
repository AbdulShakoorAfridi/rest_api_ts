import express from 'express';
import { allBooks, createBook, deleteBook, singleBook, updateBook } from '../controllers/book.controller';
import multer from "multer";
import path from 'node:path';
import { authenticationVerification } from '../middleware/authenticationVerification';

const router = express.Router();

// multer local file storage
const upload = multer({
    dest:path.resolve(__dirname,"../../public/data/uploads"),
    limits:{
        fileSize:3e7                //1024 * 1024 * 30
    }
})


router.route("/").post(authenticationVerification,upload.fields([
    {
        name:"coverImage",
        maxCount:1
    },
    {
        name:"file",
        maxCount:1
    }
]),createBook).get(allBooks)
router.route('/:id').get(singleBook).patch(updateBook).delete(deleteBook)


export default router;