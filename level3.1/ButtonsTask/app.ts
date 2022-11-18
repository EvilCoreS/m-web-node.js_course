import express, {Request, Response} from 'express'
const port = 3005, host = 'localhost'
const app = express()
const router = express.Router()

enum _1 {
    A = 'plus',
    B = 'minus'
}
type typesButtons = _1.A | _1.B
let minus = 0, plus = 0

function confirmed(req: Request, res: Response) {
    return res.status(200).json({minus, plus})
}

function test(req: Request, res: Response) {
    if (req.body.type) {
        console.log(req.body.type)
        if (req.body.type === _1.A) plus++
        else minus++
    }
    return res.status(200).json({ok: true})
}


router.route('/test')
    .get(confirmed)
    .post(test)

app.use(express.static('public'))

app.use(express.json())

app.use('/', router)

app.listen(port, host, () => {
    console.log(`Listening http://${host}:${port}`);
})