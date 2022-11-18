import {Request, Response} from "express";
import ItemsServices from "../services/items-services";
import UsersServices from "../services/users-services";
import dotenv from "dotenv";
import {User} from "../config/modules";

dotenv.config()
let dataConfig: boolean | undefined
if (process.env.GETDATAFROM_DB) {
    dataConfig = !!process.env.GETDATAFROM_DB.includes('true')
}

const IServices = new ItemsServices()
const UServices = new UsersServices()

export default class ItemsController {
    async getItems(req: Request, res: Response) {
        if (req.session.user) {
            if (!dataConfig && dataConfig !== undefined) {
                const users = UServices.getUsers().users
                req.session.user = users[users.findIndex((e: User) => {
                    if (e)
                        return e.id === req.session.user?.id
                })]
            }
            return res.status(200).json({items: await IServices.getItems(req.session.user)})
        }
        else
            return res.status(403).json({error: "forbidden"})
    }

    async addItems(req: Request, res: Response) {
        if (req.session.user) {
            if (req.body) {
                if (req.body.text){
                    if (typeof req.body.text === "string")
                        return res.status(200).json(await IServices.addItem(req.session.user, req.body.text))
                    else
                        return res.status(400).json({error: "Invalid data"})
                }
                else return  res.status(404).json({error: `Parameter \"text\" is undefined`})
            }
            else return res.status(404).json({error: `Parameter \"body\" is undefined`})
        }
        else return res.status(404).json({error: 'forbidden'})
    }

    async deleteItem(req: Request, res: Response){
        if (req.session.user) {
            if (req.body){
                if (req.body.id) {
                    if (typeof req.body.id === "string")
                        return res.status(200).json(await IServices.deleteItem(req.session.user, req.body.id))
                    else
                        return res.status(400).json({error: "Invalid data"})
                }
                else return res.status(404).json({error: `Parameter \"id\" is undefined`})
            }
            else return res.status(404).json({error: `Parameter \"body\" is undefined`})
        }
        else return res.status(404).json({error: 'forbidden'})
    }

    async updateItem(req: Request, res: Response) {
        if (req.session.user) {
            if (req.body) {
                if (req.body.id){
                    if (typeof req.body.id === "string"){
                        if (req.body.text) {
                            if (typeof req.body.text === "string")
                                return res.status(200).json(await IServices.updateItem(req.session.user, req.body))
                            else
                                return res.status(404).json({error: "Invalid data"})
                        }
                        else return res.status(200).json(await IServices.deleteItem(req.session.user, req.body.id))
                    }
                    else return res.status(400).json({error: "Invalid data"})
                }
                else return res.status(404).json(`Parameter \"id\" is undefined`)
            }
            else return res.status(404).json({error: `Parameter \"body\" is undefined`})
        }
        else return res.status(404).json({error: 'forbidden'})
    }
}