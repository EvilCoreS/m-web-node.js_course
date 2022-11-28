import AdminController from "../controllers/admin-controller";
import express from "express";
const ARouter = express.Router()

const AController = new AdminController()

ARouter.route('/')
    .get(AController.getPage)
    .post(AController.createBook)
ARouter.route('/delete')
    .delete(AController.deleteBook)
ARouter.route('/upload')
    .post(AController.uploadImg)
ARouter.route('/login')
    .get(AController.getSignIn)
    .post(AController.logIn)
ARouter.route('/logout')
    .post(AController.logOut)

export default ARouter