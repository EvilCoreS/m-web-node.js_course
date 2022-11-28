import {db} from "../../db-connection";
import * as fs from "fs";

async function start() {
    let sql = fs.readFileSync('./config/db/migrations/up/request.sql')
        .toString()
        .split(';\n')
    const sql2 = fs.readFileSync('./config/db/migrations/loadFullData/request.sql')
        .toString()
        .split(';\n')
    if (process.env['VERSION'] === '1'){
        sql.length = 2
        sql2.length = 2
    }
    else {
        sql.splice(1, 1)
        sql2.splice(1, 1)
    }
    console.log(sql2);
    sql.reduce((s, c, i) => {
        const name = c
            .split('EXISTS ')[1]
            .split('(')[0]
            .split('\n')[0]
        console.log(`Trying CREATE TABLE ${name}`)
        db.query(c, (error, result) => {
            if (error) throw error
            console.log("OK");
            const name = s[i]
                .split('INTO ')[1]
                .split(' (')[0]
            console.log(`Trying INSERT DATA INTO ${name}`)
            db.query(s[i], (error, result) => {
                if (error) throw error
                console.log("OK");
                if (i === s.length-1) console.log(process.exit(1));
            })
        })
        return s
    }, [...sql2])
}
start()