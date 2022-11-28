import mysqldump from 'mysqldump'

export default async function dumpCreate() {
    if (!process.env['DATABASE_NAME'] || !process.env['DATABASE_HOST']
        || !process.env['DATABASE_PASS'] || !process.env['DATABASE_USER']) {
        throw new Error('Missing .env file')
    }
    else await mysqldump({
        connection: {
            host: process.env['DATABASE_HOST'],
            user: process.env['DATABASE_USER'],
            password: process.env['DATABASE_PASS'],
            database: process.env['DATABASE_NAME'],
        },
        dumpToFile: './config/db/dumps/dump.sql',
    });
}