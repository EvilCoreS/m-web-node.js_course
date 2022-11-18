const express = require('express')
const app = express()
const port = 3000

let count = 0
app.get('/', (req, res) => {
    res.send(String(++count))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})