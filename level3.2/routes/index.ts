import express, {NextFunction, Request, Response} from "express";
import BRouter from "./books-router";
import ARouter from "./admin-router";
import AdminController from "../controllers/admin-controller";
import BooksController from "../controllers/books-controller";
import BookController from "../controllers/book-controller";
import expressBasicAuth from "express-basic-auth";
import myAuthorizer from "../controllers/basicAuth";

const router = express.Router()
const routerV2 = express.Router()

const AController = new AdminController()
const BsController = new BooksController()
const BController = new BookController()

async function getActions(req: Request, res: Response) {
    req.body['version'] = 2
    if (req.query && req.query['action'])
        switch (req.query['action']) {
            case 'signin':
                await AController.getSignIn(req, res)
                break
            case 'page':
                await AController.getPage(req, res)
                break
            case 'books':
                await BsController.getAll(req, res)
                break
            case 'book':
                await BController.getOne(req, res)
                break
            default:
                return res.redirect('http://localhost:3000/api/v2/router?action=books')
        }
   else return res.redirect('http://localhost:3000/api/v2/router?action=books')
}

async function postActions(req: Request, res: Response) {
    req.body['version'] = 2
    if (req.query && req.query['action'])
        switch (req.query['action']) {
            case 'create':
                await AController.createBook(req, res)
                break
            case 'delete':
                await AController.deleteBook(req, res)
                break
            case 'login':
                await AController.logIn(req, res)
                break
            case 'upload':
                await AController.uploadImg(req, res)
                break
            case 'logout':
                await AController.logOut(req, res)
                break
            case 'search':
                await BsController.searchBook(req, res)
                break
            case 'click':
                await BController.clickPlus(req, res)
                break
        }
}

routerV2.get('/book/router', getActions)
routerV2.route('/router')
    .get(getActions)
    .post(postActions)

async function authV2(req: Request, res: Response, next: NextFunction) {
    req.body['version'] = 2
    const check = await myAuthorizer(req, res, next)
    if (check && check['ok']) {
        return next()
    }
}


router.use('/api/v1',BRouter)
router.get('/admin/api/v1/login', AController.getSignIn)
router.post('/admin/api/v1/login', AController.logIn)
router.use('/admin/api/v1', myAuthorizer, ARouter)
router.use('/admin/api/v2', authV2, routerV2)
router.use('/api/v2', routerV2)

export default router