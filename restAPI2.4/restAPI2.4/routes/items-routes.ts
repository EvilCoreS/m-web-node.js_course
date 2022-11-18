import express from "express";
import ItemsController from "../controllers/items-controller";

const IControllers = new ItemsController()
export const IRouter = express.Router()

IRouter.route('/items')
    .get(IControllers.getItems)
    .post(IControllers.addItems)
    .delete(IControllers.deleteItem)
    .put(IControllers.updateItem)