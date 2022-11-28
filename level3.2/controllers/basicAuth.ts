import {NextFunction, Request, Response} from "express";
import {db} from "../config/db/db-connection";
import {RowDataPacket} from "mysql2";

export default async function myAuthorizer(req: Request, res: Response, next: NextFunction) {
    const query = (req.query as {action: string})
    const version = req.body['version'] || 1
    if (version === 1) {
        if (!req.session.user || !req.session.user['token']) {
            res.redirect(`http://localhost:3000/admin/api/v1/login`)
        }
        else {
            let data = Buffer.from(req.session.user['token'].split(' ')[1], 'base64')
                .toString()
                .split(':')
            const [login, pass] = data
            if (!(login === '1' && pass === '1')) {
                res.redirect(`http://localhost:3000/admin/api/v1/login`)
            }
            res.status(200)
            next()
        }
    }
    else {
        if (!query['action']) {
            res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
        }
        else if (query['action'] === 'signin') return {ok: true}
        else if (query['action'] === 'login') return {ok: true}
        else if ((!req.session.user || !req.session.user['token'])) {
            res.redirect(`http://localhost:3000/admin/api/v2/router?action=signin`)
        }
        else {
            let data = Buffer.from(req.session.user['token'].split(' ')[1], 'base64')
                .toString()
                .split(':')
            const [keyLogin, keyPass] = data
            const sql = `SELECT * FROM admin WHERE login = '${keyLogin}' AND pass = '${keyPass}'`
            let response = await db.promise().query(sql)
            const keys = (response as RowDataPacket)[0][0]
            const {login, pass} = keys
            if (!(login === keyLogin && pass === keyPass)) {
                res.redirect('http://localhost:3000/admin/api/v2/router?action=signin')
            }
            res.status(200)
            return {ok: true}
        }
    }
}