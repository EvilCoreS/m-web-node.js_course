import BooksController from "../controllers/books-controller";
import BookController from "../controllers/book-controller";
import express from "express";
const BRouter = express.Router()

const BsController = new BooksController()
const BController = new BookController()

BRouter.route('/')
    .get(BsController.getAll)
    .post(BsController.searchBook)
BRouter.route('/book/:id')
    .get(BController.getOne)
    .post(BController.clickPlus)

export default BRouter