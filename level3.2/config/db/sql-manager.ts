import {db} from "./db-connection";
import * as fs from "fs";
import {RowDataPacket} from "mysql2";
import {author, dataForCreate, dataForCreateV2} from "../../models/interfaces/interface";

export default class SqlManager {
    async getCountRows() {
        const sql = fs.readFileSync('./config/db/sqlFiles/admin-page.sql').toString()
        let response = await db.promise().execute(sql)
        const data = (response as RowDataPacket[])[0][0]['COUNT(id)']
        return data
    }

    async getLastID() {
        const sql = fs.readFileSync('./config/db/sqlFiles/last-id.sql').toString()
        let response = await db.promise().execute(sql)
        const data = (response as RowDataPacket[])[0][0]['MAX(id)']
        return data ? data : 0
    }

    async createBook(data: (string | number)[]) {
        if (data.length === 7) {
            const sql = fs.readFileSync('./config/db/sqlFiles/insert-book-data.sql').toString()
            await db.promise().execute(sql, data)
            return {ok: true}
        } else {
            const e = new Error('Invalid data')
            throw e
        }
    }

    async findAuthKeys(obj: { login: string, pass: string }) {
        const {login, pass} = obj
        const sql = fs.readFileSync('./config/db/sqlFiles/find-login-pass.sql').toString()
        const response = await db.promise().execute(sql, [login, pass])
        const data = (response as RowDataPacket[])[0][0]
        return data
    }

    async deleteBook(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/delete-book.sql').toString()
        await db.promise().execute(sql, [id])
        return {ok: true}
    }

    async get4Books(page: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/get-4-books.sql').toString()
        const temp = (page - 1) * 4
        const response = await db.promise().execute(sql, [temp.toString()])
        const data = (response as RowDataPacket[])[0]
        return data
    }

    async getBooks(offset: number, page: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/get-books.sql').toString()
        const response = await db.promise().execute(sql, [offset.toString(), ((page - 1) * offset).toString()])
        const data = (response as RowDataPacket[])[0]
        return data
    }

    async searchText(text: string) {
        const sql = fs.readFileSync('./config/db/sqlFiles/search.sql').toString()
        const response = await db.promise().execute(sql, [`%${text}%`, `%${text}%`, `%${text}%`])
        const data = (response as RowDataPacket[])[0]
        return data
    }

    async getOne(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/get-1-book.sql').toString()
        const response = await db.promise().execute(sql, [id])
        const data = (response as RowDataPacket[])[0][0]
        return data
    }

    async updateClicks(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/update-clicks.sql').toString()
        await db.promise().execute(sql, [id])
        return {ok: true}
    }

    async updateViews(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/update-views.sql').toString()
        await db.promise().execute(sql, [id])
        return {ok: true}
    }

    async getBusy(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/get-busy.sql').toString()
        const response = await db.promise().execute(sql, [id])
        const data = (response as RowDataPacket[])[0][0]['isbusy']
        return data
    }

    async markDelete(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/mark-to-delete.sql').toString()
        await db.promise().execute(sql, [id])
        return {ok: true}
    }

    async deleteMarks() {
        const sql = fs.readFileSync('./config/db/sqlFiles/deleteMarks.sql').toString()
        await db.promise().execute(sql)
        return {ok: true}
    }

    async clueTables(booksObj: dataForCreateV2, authorObj: author) {
        const {id, name, description, year, pages, isbn} = booksObj
        const sql = fs.readFileSync('./config/db/sqlFiles/write-book-author.sql')
            .toString()
            .split(';\n')
        db.execute(sql[0], [id, name, description, year, pages, isbn], (error, result) => {
            if (error) throw error
            db.execute(sql[1], [authorObj['id'], authorObj['author']], (error, result) => {
                if (error) throw error
                db.execute(sql[2], [id, authorObj['id']], (err, result) => {
                    if (err) throw err
                    return {ok: true}
                })
            })
        })
        return {ok: true}
    }

    async getLastAuthorsID() {
        const sql = fs.readFileSync('./config/db/sqlFiles/last-id-authors.sql').toString()
        let response = await db.promise().execute(sql)
        const data = (response as RowDataPacket[])[0][0]['MAX(id)']
        return data ? data : 0
    }

    async getAuthorByID(id: number) {
        const sql = fs.readFileSync('./config/db/sqlFiles/get-author.sql').toString()
        let response = await db.promise().execute(sql, [id])
        const data = (response as RowDataPacket[])[0][0]['author']
        return data
    }

    async deleteMarksV2() {
        const sql = fs.readFileSync('./config/db/sqlFiles/deleteMarksV2.sql')
            .toString()
            .split(';\n')
        const response = await db.promise().execute(sql[0])
        const data = (response as RowDataPacket[])[0]
        for (let i = 0; i < data.length; i++) {
            await db.promise().execute(sql[1], [data[i]['id']])
        }
        return {ok: true}
    }

    async searchAuthor(text: string) {
        const sql = fs.readFileSync('./config/db/sqlFiles/searchAuthor.sql')
            .toString()
            .split(';\n')
        let response = (await db.promise().execute(sql[1], [`%${text}%`])) as RowDataPacket[]
        if (response[0].length > 0) {
            for (let i = 0; i < response[0].length; i++) {
                const id = ((await db.promise().execute(sql[2], [response[0][i]['id']])) as RowDataPacket[])[0][0]['booksID']
                const book = ((await db.promise().execute(sql[3], [id])) as RowDataPacket[])[0]
                Object.assign(response[0][i], book[0])
            }
        }
        else {
            response = (await db.promise().execute(sql[0], [`%${text}%`, `%${text}%`])) as RowDataPacket[]
            if (response[0].length > 0) {
                for (let i = 0; i < response[0].length; i++) {
                    const id = ((await db.promise().execute(sql[4], [response[0][i]['id']])) as RowDataPacket[])[0][0]['authorID']
                    const author = ((await db.promise().execute(sql[5], [id])) as RowDataPacket[])[0]
                    Object.assign(response[0][i], author[0])
                }
            }
            else return []
        }
        return response[0]
    }
}