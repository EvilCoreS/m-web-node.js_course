import * as fs from "fs";
import {db} from "../../db-connection";

export default async function up () {
    const sql = fs.readFileSync('./config/db/migrations/up/request.sql')
        .toString()
        .split(';\n')
    if (process.env["VERSION"] === '1') {
        sql.length = 2
    } else sql.splice(1, 1)
    sql.reduce((s, c, i) => {
        const temp = c
            .split('EXISTS ')[1]
            .split('(')[0]
            .split('\n')[0]
        console.log(`Trying CREATE TABLE ${temp}`)
        db.query(c, (error, result) => {
            if (error) throw error
            console.log("OK")
            if (i === sql.length-1) process.exit(1)
        })
        return s
    }, [])
}
up()