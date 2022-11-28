import express from 'express'
import fileUpload from 'express-fileupload'
import * as path from "path";
import router from "./routes";
import session from 'express-session';
import cron from 'node-cron';
import SqlManager from "./config/db/sql-manager";
import dumpCreate from "./config/db/dump";

const sql = new SqlManager()

if (!process.env['VERSION']) throw new Error('Missing .env file')

// tick per hour
cron.schedule('0 * * * *', () => {
    if (process.env['VERSION'] !== '1') {
        sql.deleteMarksV2().then(() => {
            sql.deleteMarks().then(() => console.log('Deleted'))
        })
    }
    else sql.deleteMarks().then(() => console.log('Deleted'))
});

cron.schedule('0 0 * * *', () => {
    dumpCreate().then(() => console.log("Dump created"))
})

const app = express()
const host = 'localhost', port = 3000

app.use(session({
    secret: 'unrealSecret1',
    resave: false,
    saveUninitialized: false
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static('public'))

app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(port, host, () => {
    console.log(`Server listening 
    Router v1: http://${host}:${port}/admin/api/v1
    Router v2: http://${host}:${port}/admin/api/v1/router?action=page`);
})