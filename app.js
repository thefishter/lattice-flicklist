import './config'

import express from "express"
import bodyParser from "body-parser"

import router from "./routes"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

app.all('*', (req, res) => res.redirect('/api'))

const server = app.listen(3000, () => {
    console.log("Listening on port", server.address().port)
})
