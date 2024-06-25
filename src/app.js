const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const clienteRoutes = require('./routes/clienteRoutes')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api/formulario', clienteRoutes)

app.all('*', (req, res) => {
  res.status(404).send('Endpoint não encontrado')
})

module.exports = app
