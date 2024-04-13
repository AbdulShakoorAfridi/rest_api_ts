import { USER } from "./userTypes";

export interface BOOK_TYPES {
    _id:string;

    title:string;

    author:USER;

    description:string;

    genre:string;

    coverImage:string;

    file:string;

    createdAt:Date;

    updatedAt:Date;
}