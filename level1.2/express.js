const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let result = Object.values(req.query).reduce((s, c, i) => {
        return s += Number(c)
    }, 0)
    res.send(`${result}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})