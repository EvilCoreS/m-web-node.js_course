import {Request, Response} from "express";
import BooksServices from "../models/services/books-services";

const BsServices = new BooksServices()

export default class BooksController {
    async getAll(req: Request, res: Response) {
        const queryOffset: string | undefined = (req.query as {offset: string})['offset'] || undefined
        const queryPage: string | undefined = (req.query as {page: string})['page'] || undefined
        const version = req.body['version'] || 1
        if (queryOffset && queryPage) {
            const offset = Number(queryOffset), page = Number(queryPage)
            if (offset && page) {
                const data = await BsServices.getAll(offset, page)
                res.status(200).render('books-page', {
                    obj: data,
                    v: {version}
                })
            }
            else return  res.status(400).json({error: "Invalid data in query"})
        }
        else {
            if (version === 1) res.redirect(`http://localhost:3000/api/v1/?offset=20&page=1`)
            else res.redirect(`http://localhost:3000/api/v2/router?action=books&offset=20&page=1`)
        }
    }


    async searchBook(req: Request, res: Response) {
        if (req.body) {
            const version = req.body['version'] || 1
            if (req.body['text']) {
                if (req.body['text'].length < 150) {
                    if (/^[A-Z0-9А-Я+*&\-_ #$^%().,]+$/i.test(req.body['text'])) {
                        const data = await BsServices.searchBook(req.body['text'])
                        res.status(200).render('books-page', {obj: data, v: {version}})
                    }
                    else res.status(400).json({error: "Only letter and numbers are allowed"})
                }
                else res.status(400).json({error: "Very long text"})
            }
            else res.status(400).json({error: "Text is empty"})
        }
        else res.status(400).json({error: "Body is missing"})
    }
}