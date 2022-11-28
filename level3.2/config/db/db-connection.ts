import mysql from 'mysql2'

if (!process.env["DATABASE_HOST"] || !process.env["DATABASE_NAME"] ||
    !process.env["DATABASE_PASS"] || !process.env["DATABASE_USER"]) {
    const err = new Error('Missing .env file or invalid data')
    throw err
}

export const db = mysql.createPool({
    host: process.env["DATABASE_HOST"],
    user: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASS'],
    database: process.env['DATABASE_NAME'],
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});