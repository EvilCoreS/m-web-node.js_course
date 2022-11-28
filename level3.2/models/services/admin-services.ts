import * as fs from "fs";
import {dataForCreate, objImage} from "../interfaces/interface";
import {UploadedFile} from "express-fileupload";
import SqlManager from "../../config/db/sql-manager";

const sql = new SqlManager()

export default class AdminServices {
    async getPage(page: string) {
        const books = await sql.get4Books(Number(page) ? Number(page) : 1)
        const countRows = await sql.getCountRows()
        const temp = countRows / 4
        const pages = countRows <= 4 ? 1 : Math.ceil(temp)
        if (process.env['VERSION'] !== '1') {
            for (let i = 0; i < books.length; i++) {
                books[i]['author'] = await sql.getAuthorByID(books[i]['id'])
            }
        }
        const arr = []
        for (let i = 0; i < pages; i++) arr.push(i+1)
        const obj = {
            booksArray: books,
            currentPage: page,
            lastPage: String(pages)
        }
        return obj
    }

    async createBook(data: dataForCreate) {
        const {name, pages, author, isbn, description, year} = data
        const dataDB = await sql.getLastID()
        const id: number = dataDB + 1
        if (process.env['VERSION'] === '1' && author) {
            await sql.createBook([id, name, pages, author, isbn, description, year])
            return String(id)
        }
        else {
            if (author) {
                const booksID: number = await sql.getLastID()
                const authorID: number = await sql.getLastAuthorsID()
                await sql.clueTables({id: booksID+1, name, pages, isbn, description, year}, {author: author, id: authorID+1})
                return {booksID, authorID}
            }
        }
    }

    uploadImg(img: UploadedFile | UploadedFile[], id: string) {
        const file: objImage = (img as UploadedFile | UploadedFile[][0])
        fs.writeFileSync(`./public/images/books/${id}.jpg`, file['data']);
        return {ok: true}
    }

    async logIn(keys: { login: string, pass: string }) {
        const {login, pass} = keys
        if (login && pass) {
            const data = await sql.findAuthKeys(keys)
            if (data) {
                return keys
            } else return undefined
        }

    }

    async deleteBook(id: number) {
        if (process.env && process.env['VERSION']) {
            if (process.env['VERSION'] === '1') {
                await sql.deleteBook(id)
                try {
                    fs.unlinkSync(`./public/images/books/${id}.jpg`)
                }catch (e) {console.log(e);}
                return {ok: true}
            }
            else {
                await sql.markDelete(id)
                return {ok: true}
            }
        }
        else throw new Error('Missing or invalid .env file')
    }
}

