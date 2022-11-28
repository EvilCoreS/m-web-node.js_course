import SqlManager from "../../config/db/sql-manager";

const sql = new SqlManager()

export default class BooksServices {
    async getAll(count: number, page: number){
        const books = await sql.getBooks(count, page)
        const countRows = await sql.getCountRows()
        const temp = countRows / count
        const pages = countRows <= count ? 1 : Math.ceil(temp)
        const obj = {
            booksArray: books,
            currentPage: page,
            lastPage: pages,
            offset: count
        }
        return obj
    }

    async searchBook(text: string) {
        const data = process.env['VERSION'] === '1' ? await sql.searchText(text) : await sql.searchAuthor(text)
        return {
            booksArray: data,
            lastPage: 1,
            text
        }
    }
}