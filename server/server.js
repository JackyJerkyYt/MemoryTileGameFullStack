const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
require("dotenv").config();

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(cors())

const CONNECTION = process.env.MONGO_URI || "mongodb+srv://Jacky:Test1234@cluster0.ndswtah.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log("database connected")
    })

const routing = require('./routes/routing')

app.use("", routing)


app.listen(process.env.PORT || 8083, () => {
  console.log("server is running")
})
