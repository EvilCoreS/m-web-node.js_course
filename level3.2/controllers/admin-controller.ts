import e, {Request, Response} from "express";
import AdminServices from "../models/services/admin-services";
import {objForAdminTemplate} from "../models/interfaces/interface";
import {UploadedFile} from "express-fileupload";

const AService = new AdminServices()

export default class AdminController {
    async getPage(req: Request, res: Response){
        const version = req.body['version'] || 1
        if (req.query['page']) {
            const page: string = (req.query as {page: string})['page']
            if (!!Number(page)) {
                if (req.session.user) {
                    if (req.session.user['token']) {
                        const data: objForAdminTemplate = await AService.getPage(page)
                        data['version'] = version
                        if (Number(data['lastPage']) >= Number(page) && Number(page) >= 1)
                            res.status(200).render('admin', {obj: data})
                        else {
                            if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/?page=1`)
                            else res.redirect(`http://localhost:3000/admin/api/v2/router?action=page&page=1`)
                        }
                    }
                }
                else {
                    if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
                    else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
                }
            }
            else res.status(400).json({error: "Invalid data in query"})
        }
        else {
            if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/?page=1`)
            else res.redirect(`http://localhost:3000/admin/api/v2/router?action=page&page=1`)
        }
    }

    getSignIn(req: Request, res: Response){
        if (req.body && req.body['version']){
            res.render('sign-in', {
                version: req.body['version']
            })
        }
        else res.render('sign-in')
    }

    async createBook(req: Request, res: Response){
        if (req.body) {
            const version = req.body['version'] || 1
            const arrNames = ['name', 'author', 'description'],
                arrValues = ['isbn', 'year', 'pages']
            if (arrNames.every(e => typeof req.body[e] === "string") && arrValues.every(e => !!Number(req.body[e]))) {
                const result = await AService.createBook(req.body)
                if (typeof result === "string") {
                    if (req.session.user) {
                        req.session.user["lastID"] = result
                        res.status(200).json({ok:true})
                    }
                    else {
                        if (version === 1) res.redirect('http://localhost:3000/admin/api/v1/login')
                        else res.redirect('http://localhost:3000/admin/api/v2/router?action=signin')
                    }
                }
                else if (result){
                    if (req.session.user) {
                        req.session.user["lastID"] = String(result["booksID"])
                        res.status(200).json({ok: true})
                    }
                    else {
                        if (version === 1) res.redirect('http://localhost:3000/admin/api/v1/login')
                        else res.redirect('http://localhost:3000/admin/api/v2/router?action=signin')
                    }
                }
            }
            else res.status(400).json({error: "Invalid data"})
        }
        else res.status(400).json({error: "Body is missing"})
    }

    async uploadImg(req: Request, res: Response) {
        if (req.body) {
            const version = req.body['version'] || 1
            if (req.session.user) {
                if (req.session.user['lastID']) {
                    if (req.files)
                        if (req.files['user-file'])
                            if ((req.files['user-file'] as UploadedFile)['mimetype'].includes('image'))
                                if ((req.files['user-file'] as UploadedFile)['size'] < 1000000){
                                    res.status(200).json(AService.uploadImg(req.files['user-file'], req.session.user['lastID']))
                                }
                                else res.status(400).json({error: "Image size too large"})
                            else res.status(400).json("File isn't a image")
                        else res.status(500).json({error: "Something went wrong"})
                    else {
                        req.body['id'] = req.session.user['lastID']
                        await this.deleteBook(req, res)
                        res.status(400).json({error: "Image is missing"})
                    }
                }
                else {
                    if (version === 1) res.redirect('http://localhost:3000/admin/api/v1/login')
                    else res.redirect('http://localhost:3000/admin/api/v2/router?action=signin')
                }
            }
            else {
                if (version === 1) res.redirect('http://localhost:3000/admin/api/v1/login')
                else res.redirect('http://localhost:3000/admin/api/v2/router?action=signin')
            }
        }
        else res.status(400).json({error: "Body is missing"})
    }

    async logIn(req: Request, res: Response){
        const version = req.body['version'] || 1
        if (req.body) {
            const arrKeys = ['login', 'pass']
            if (arrKeys.every(e => req.body[e])) {
                if (arrKeys.every(e => /^[A-Z0-9^&#%$*]{0,20}$/i.test(req.body[e]))){
                    const result = await AService.logIn(req.body)
                    const version = req.body['version'] || 1
                    if (result) {
                        const auth = 'Basic ' + new Buffer(result.login + ':' + result.pass).toString('base64');
                        req.session.user = {token: auth}
                        if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1`)
                        else res.redirect(`http://localhost:3000/admin/api/v2/router?action=page`)
                    }
                    else {
                        if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
                        else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
                    }
                }
                else {
                    if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
                    else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
                }
            }
            else {
                if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
                else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
            }
        }
        else {
            if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
            else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
        }
    }

    logOut(req: Request, res: Response){
        const version = req.body['version'] || 1
        if (req.session.user) {
            req.session.destroy(() => {
                if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
                else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
            })
        }
        else {
            if (version === 1) res.redirect(`http://localhost:3000/admin/api/v1/login`)
            else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
        }
    }

    async deleteBook(req: Request, res: Response) {
        const version = req.body['version'] || 1
        if (req.session.user)
            if (req.body)
                if (req.body['id']) {
                    const id = Number(req.body.id)
                    if (id) res.status(200).json(await AService.deleteBook(id))
                    else res.status(400).json({error: 'Invalid data'})
                }
                else res.status(400).json({error: 'Missing id'})
            else res.status(400).json({error: 'Body is empty'})
        else {
            if (version === 1) res.redirect('http://localhost:3000/admin/api/v1/login')
            else res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
        }
    }
}