import express, {Request, Response} from "express";
import {IRouter} from "./items-routes";
import {URouter} from "./users-routes";
import ItemsController from "../controllers/items-controller";
import UsersController from "../controllers/users-controller";

const IController = new ItemsController()
const UController = new UsersController()

async function getAction(req: Request, res: Response) {
    switch (req.query.action) {
        case 'getItems':
            await IController.getItems(req, res)
            break
        case 'createItem':
            await IController.addItems(req, res)
            break
        case 'deleteItem':
            await IController.deleteItem(req, res)
            break
        case 'editItem':
            await IController.updateItem(req, res)
            break
        case 'login':
            await UController.login(req, res)
            break
        case 'logout':
            UController.logout(req, res)
            break
        case 'register':
            await UController.register(req, res)
            break
        default:
            return res.status(400).send({message: `Parameter \"action\" is empty.`})
    }
}

const router = express.Router()
const routerV2 = express.Router()

routerV2.route('/router')
    .post(getAction)

router.use('/api/v1/', IRouter, URouter)
router.use('/api/v2/', routerV2)

export default router