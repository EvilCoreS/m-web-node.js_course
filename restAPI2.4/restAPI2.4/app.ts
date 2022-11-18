import dotenv from "dotenv"
import express from "express";
import router from "./routes";
import session from "express-session";
import * as mongoose from "mongoose";
import fs from "fs";
import cors from "cors";

// CORS options
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

// .env configuration
dotenv.config()

// true = from MongoDB, false = from data.json
let dataConfig: boolean | undefined
if (process.env.GETDATAFROM_DB){
    dataConfig = !!process.env.GETDATAFROM_DB.includes('true');
}
if (dataConfig === undefined) {
    throw new Error(".env file is missing.")
}
else if (!dataConfig) {
    try {
        fs.readFileSync('../restAPI2.4data/data.json')
    } catch (e) {
        throw new Error("data.json is missing.")
    }
}
console.log(dataConfig ? "Working with MongoDB" : "Working with data.json file")


// Connect to MongoDB
if (dataConfig) {
    if (process.env.DATABASE_URI) {
        mongoose
            .connect(process.env.DATABASE_URI)
            .then(() => {console.log('Connected to MongoDB');})
            .catch((e) => console.log(e))
    }
}

const host = 'localhost',
    port = 3005

const app = express()

app.use(cors(corsOptions));

app.use(express.static('public'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.json())

app.use('/', router)

app.listen(port, host, () => console.log(`Server listens: http://${host}:${port}`))