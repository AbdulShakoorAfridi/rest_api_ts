import {Request,Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { config } from "../config/config";



// book controller
// @access public
// @route POST /api/books


export const createBook = async (req:Request, res:Response, next:NextFunction) => {



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

   

};