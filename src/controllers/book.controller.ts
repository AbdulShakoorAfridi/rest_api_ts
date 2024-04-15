import {Request,Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { config } from "../config/config";
import cloudinary from "../config/cloudenery";
import path from 'node:path'
import fs from 'node:fs'
import { BookModel } from "../models/book.model";
import { CustomError } from "../middleware/CustomError";
import { AuthRequest } from "../middleware/authenticationVerification";

// book controller
// @access public
// @route POST /api/books


export const createBook = async (req:Request, res:Response, next:NextFunction) => {

    try {
    

    const files = req.files as { [fieldname: string]: Express.Multer.File[]};
    

    // let coverImageMimeType;
    // let filename;
    // let filePath;
   

    if (files && files['coverImage']) {

       const  coverImageMimeType = files['coverImage'][0].mimetype.split("/").at(-1);
        const  filename = files['coverImage'][0].filename;
        const filePath = path.resolve(__dirname, '../../public/data/uploads', filename); 
        const uploadResult = await cloudinary.uploader.upload(filePath, {
             filename_override: filename,
             folder: "book-covers",
             format: coverImageMimeType,
            });
            
            const bookFileName = files.file[0].filename;
            const bookFilePath = path.resolve(__dirname, '../../public/data/uploads', bookFileName);
            
            const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type:"raw",
            filename_override: bookFileName,
            folder: "books-pdf",
            format: "pdf",
            
        });
        
        
        // @ts-ignore
        // console.log(req.userId);
        const _req = req as AuthRequest;

        const newBookFile = await BookModel.create({
            title: req.body.title,
            author: _req.userId,
            description: req.body.description,
            genre:req.body.genre,
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url,
        });

        try {
            
            // deleting temp files 
            await fs.promises.unlink(filePath);
            await fs.promises.unlink(bookFilePath);
        } catch (error) {
            return next(error);
        }

        res.status(201).json({
            status: "success",
            message: "Book created successfully",
            data: newBookFile,
        });
    }else{
        return next(createHttpError(500, "Book creation failed :" + req.body))
    }
     
    } catch (error) {
        const err = createHttpError( 403,`error while creating book. ${error}`);
        return next(err);
    }

};



//@ all Books controller
// @ access public
// @ route GET /api/books


export const allBooks = async (req:Request, res:Response, next:NextFunction) => {

    try {

        const allBooks = await BookModel.find({});
        if(allBooks.length < 1) return next(createHttpError(400,"No Books found"));
        
        res.status(200).json({
            status: "success",
            message: "Books fetched successfully",
            data: allBooks,
        });
      
    } catch (error) {
        const err = createHttpError( 403,`error while fetching books. ${error}`);
        return next(err);
    }

};

//@ getting single Book controller
// @ access public
// @ route GET /api/books/:id


export const singleBook = async (req:Request, res:Response, next:NextFunction) => {

    try {
        
            const { id } = req.params;
            const book = await BookModel.findById(id);
            if (!book) {
                const error = createHttpError(404, "Book not found" + id);
               return next(error);
            }
            res.status(200).json(book);

    } catch (error) {
        const err = createHttpError( 403,`error while fetching single book. ${error}`);
        return next(err);
    }
   

};

//@ updating  Book controller
// @ access public
// @ route PATCH /api/books/:id


export const updateBook = async (req:Request, res:Response, next:NextFunction) => {

    const files = req.files as { [fieldname: string]: Express.Multer.File[]};


    let completeCoverImage;

    if (files && files['coverImage']) {

        const  coverImageMimeType = files['coverImage'][0].mimetype.split("/").at(-1);
         const  filename = files['coverImage'][0].filename;
         const filePath = path.resolve(__dirname, '../../public/data/uploads', filename); 

         completeCoverImage = filename;
         const uploadResult = await cloudinary.uploader.upload(filePath, {
              filename_override: completeCoverImage,
              folder: "book-covers",
              format: coverImageMimeType
             });
             

         completeCoverImage = uploadResult.secure_url;
         await fs.promises.unlink(filePath);
    }
    
    let completeFileName;
    if(files.file){
        const bookFilePath = path.resolve(__dirname,"../../public/data/uploads/" + files.file[0].filename);

        const bookFileName = files.file[0].filename;
        completeFileName = bookFileName;


          const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type:"raw",
            filename_override: completeFileName,
            folder: "books-pdf",
            format:"pdf"           
        });

        completeFileName = bookFileUploadResult.secure_url;
        await fs.promises.unlink(bookFilePath);

    }

   try {

    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
        const error = createHttpError(404, "Book not found" + id);
       return next(error);
    }
    const updatedBook = await BookModel.findByIdAndUpdate(id, {
        ...req.body,
        coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
        file: completeFileName ? completeFileName : book.file,
    }, { new: true, runValidators:true });
    if (!updatedBook) {
        const error = createHttpError(404, "Book update failed" + id);
       return next(error);
    }
    res.status(200).json(
        {
            status: "success",
            message: "Book updated successfully",
            data: updatedBook,
        }
    );

   } catch (error) {
    const err = createHttpError( 403,`error while updating book. ${error}`);
    return next(err);
}

};

//@ deleting  Book controller
// @ access public
// @ route PATCH /api/books/:id


export const deleteBook = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const { id } = req.params;
        const book = await BookModel.findById(id);
        if (!book) {
            const error = createHttpError(404, "Book not found :" + id);
           return next(error);
        }

        const coverImageFile = book.coverImage;
        const bookCoverPublicIdPt1 = coverImageFile.split("/").at(-2);
        const bookCoverPublicIdPt2 = coverImageFile.split("/").at(-1);
        const coverP2firstPart = bookCoverPublicIdPt2?.split(".").at(0);
        
        const coverImagePublicId= bookCoverPublicIdPt1+"/"+coverP2firstPart;
 

        const bookFile = book.file;
        const bookFilePublicIdPt1 = bookFile.split("/").at(-2);
        const bookFilePublicIdPt2 = bookFile?.split("/").at(-1);
    
        
        const bookFilePublicId= bookFilePublicIdPt1+"/"+bookFilePublicIdPt2;



        try {
            await cloudinary.uploader.destroy(bookFilePublicId);
            await cloudinary.uploader.destroy(coverImagePublicId,{
                resource_type:"raw"
            })
        } catch (error) {
            return next(createHttpError(500, "Could not delete book file"+ error));
        }

        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            const error = createHttpError(404, "Book delete failed :" + id);
           return next(error);
        }

        res.sendStatus(204)
        
    } catch (error) {
        const err = createHttpError( 403,`error while deleting a book. ${error}`);
        return next(err);

    }


};