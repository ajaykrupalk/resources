require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get("/",(req,res) => {
    res.status(200).send({"message": "Success"})
})


app.listen(5000, ()=>{
    console.log("Listening on port 5000")
})