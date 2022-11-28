import {RowDataPacket} from "mysql2";

export interface dataForCreate {
    id: number
    name: string,
    pages: number,
    author?: string,
    isbn: number,
    description: string,
    year: number,
    clicks: number,
    views: number,
    isbusy: number,
    toDelete: number
}

export interface dataForCreateV2 {
    id: number
    name: string,
    pages: number,
    isbn: number,
    description: string,
    year: number
}

export interface author {
    id: number,
    author: string
}

interface Book {
    id: number,
    name: string,
    description: string,
    author: string,
    year: number,
    page: number,
    isbn: number,
    clicks: number
}

export interface objForAdminTemplate {
    booksArray: RowDataPacket,
    currentPage: string,
    lastPage: string,
    version?: number
}

export interface objForBooksTemplate {
    booksArray: RowDataPacket[],
    lastPage?: string
}

export type objImage = {
    name: string,
    data: Buffer,
    mimetype: string
}

declare module 'express-session' {
    interface SessionData {
        user: {
            token: string
            lastID?: string
            // login: string,
            // pass: string,
            // lastID?: string
        }
    }
}