require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const resourceRoute = require("./routes/resource.route")

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("",resourceRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(5000, ()=>{
            console.log("Connected to DB and Listening on port 5000")
        })
    })
    .catch((error)=>{
        console.log("Error connecting to DB", error.message)
    })