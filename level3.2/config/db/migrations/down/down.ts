import * as fs from "fs";
import {db} from "../../db-connection";

export default async function down() {
    const sql = fs.readFileSync('./config/db/migrations/down/request.sql')
        .toString()
        .split(';\n')
    sql.reduce((s, c, i) => {
        console.log(`Trying ${c}`)
        db.query(c, (error, result) => {
            if (error) throw error
            console.log("OK")
            if (i === sql.length-1) process.exit(1)
        })
        return s
    }, [])
}
down()