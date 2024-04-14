import {Request,Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { config } from "../config/config";
import cloudinary from "../config/cloudenery";
import path from 'node:path'

// book controller
// @access public
// @route POST /api/books


export const createBook = async (req:Request, res:Response, next:NextFunction) => {

    // console.log("files : " ,req.files);

    const files = req.files as { [fieldname: string]: Express.Multer.File[]};
    

    let coverImageMimeType;
    let filename;
    let filePath;
 
    if (files && files['coverImage']) {
         coverImageMimeType = files['coverImage'][0].mimetype.split("/").at(-1);
         filename = files['coverImage'][0].filename;
         filePath = path.resolve(__dirname, '../../public/data/uploads', filename);
         const uploadResult = await cloudinary.uploader.upload(filePath, {
             filename_override: filename,
             folder: "book-covers",
             format: coverImageMimeType,
            });
           
            console.log("upload result : ",uploadResult);
        }
        
        const bookFileName = files.file[0].filename;
   const bookFilePath = path.resolve(__dirname, '../../public/data/uploads', bookFileName);

   const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
       resource_type:"raw",
       filename_override: bookFileName,
       folder: "books-pdf",
       format: "pdf",
       
    });
    
    console.log("upload bookFile : ",bookFileUploadResult);
    
    res.status(201).json({
        status: "success",
        message: "Book created successfully",
    })

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