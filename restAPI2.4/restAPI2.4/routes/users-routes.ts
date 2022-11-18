import express from "express";
import UsersController from "../controllers/users-controller";


const UController = new UsersController()
export const URouter = express.Router()

URouter.route('/login')
    .post(UController.login)
URouter.route('/logout')
    .post(UController.logout)
URouter.route('/register')
    .post(UController.register)