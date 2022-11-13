const express = require('express')
const config = require('./api/config/config')
const router = require('./api/router/router')
const app = express()

app.use(express.json())

app.use('/v1', router)

const port = config.PORT

app.listen(port, () => {
    console.log(`API Started at port ${port}`)
})