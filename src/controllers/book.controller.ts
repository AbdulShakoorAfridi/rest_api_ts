import {Request,Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { config } from "../config/config";
import cloudinary from "../config/cloudenery";
import path from 'node:path'
import fs from 'node:fs'
import { BookModel } from "../models/book.model";
import { CustomError } from "../middleware/CustomError";

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
        
        
        // console.log("upload result : ",uploadResult);
        // console.log("upload bookFile : ",bookFileUploadResult);
        
        const newBookFile = await BookModel.create({
            title: req.body.title,
            author: req.body.author,
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

   

};

//@ getting single Book controller
// @ access public
// @ route GET /api/books/:id


export const singleBook = async (req:Request, res:Response, next:NextFunction) => {

    // const { id } = req.params;
    // const book = await Book.findById(id);
    // if (!book) {
    //     throw createHttpError(404, "Book not found");
    // }
    // res.status(200).json(book);
   

};

//@ updating  Book controller
// @ access public
// @ route PATCH /api/books/:id


export const updateBook = async (req:Request, res:Response, next:NextFunction) => {

   

};

//@ deleting  Book controller
// @ access public
// @ route PATCH /api/books/:id


export const deleteBook = async (req:Request, res:Response, next:NextFunction) => {

   res.status(200).send({ message:'deleted success'})

};