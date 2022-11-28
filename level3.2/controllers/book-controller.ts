import {Request, Response} from "express";
import BookServices from "../models/services/book-services";

const BService = new BookServices()

export default class BookController {
    async getOne(req: Request, res: Response) {
        if (req.params.id || req.query['id']) {
            if (/[0-9]+/.test(req.params.id) || /[0-9]+/.test((req.query as {id: string})['id'])) {
                const id  = req.params.id || (req.query as {id: string})['id']
                const data = await BService.getOne(id)
                res.render('book-page', {
                    obj: data,
                    v: req.body['version'] || 1
                })
            }
            else res.status(400).json({error: "Invalid id"})
        }
        else return res.status(400).json({error: "Missing data"})
    }

    async clickPlus(req: Request, res: Response) {
        if (req.body)
            if (req.body['id'])
                if (/[0-9]+/.test(req.body['id']))
                    return res.status(200).json(await BService.clickPlus(req.body['id']))
                else return res.status(400).json({error: "Invalid id"})
            else return res.status(400).json({error: 'Invalid id'})
        else return res.status(400).json({error: "Body is missing"})
    }
}