const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const formularioRoutes = require('./routes/formulario')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.use('/formulario', formularioRoutes)

module.exports = app
