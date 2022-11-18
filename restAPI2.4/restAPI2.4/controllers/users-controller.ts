import {Request, Response} from "express";
import UsersServices from "../services/users-services";
const UServices = new UsersServices()

export default class UsersController {
    async login(req: Request, res: Response){
        if (req.body) {
            if (req.body.login) {
                if (typeof req.body.login === "string") {
                    if (req.body.pass) {
                        if (typeof req.body.pass === "string") {
                            const user = await UServices.login(req.body)
                            if (user?.error === "not found")
                                return res.status(404).json({error: "not found"})
                            else if (user) {
                                req.session.user = user
                                res.status(200).json({ok: true})
                            }
                            else return res.status(500).json({error: "Data file is missing or no connection with MongoDB"})
                        }
                        else return res.status(400).json({error: "Invalid data in \"login\""})
                    }
                    else return res.status(404).json({error: "Parameter \"pass\" is undefined"})
                }
                else return res.status(400).json({error: "Invalid data in \"login\""})
            }
            else return res.status(404).json({error: "Parameter \"login\" is undefined"})
        }
        else return res.status(400).json({error: "Bad Request"})
    }

    logout(req: Request, res: Response) {
        req.session.destroy(() => {
            return res.status(200).json({ok: true})
        })
    }

    async register(req: Request, res: Response){
        if (req.body) {
            if (req.body.login) {
                if (typeof req.body.login === "string") {
                    if (req.body.pass) {
                        if (typeof req.body.pass === "string") {
                            const response = await UServices.register(req.body)
                            if (response && response.ok) {
                                return res.status(200).json({ok: true})
                            }
                            else return res.status(400).json({error: "This login is busy"})
                        }
                        else return res.status(400).json({error: "Invalid data in \"pass\""})
                    }
                    else
                        return res.status(404).json({error: "Parameter \"pass\" is undefined"})
                }
                else return res.status(400).json({error: "Invalid data in \"login\""})
            }
            else return res.status(404).json({error: "Parameter \"login\" is undefined"})
        }
        else return res.status(400).json({error: "Bad Request"})
    }
}