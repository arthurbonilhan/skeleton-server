const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const clienteRoutes = require('./routes/clienteRoutes')
const dotenv = require('./config/dotenv')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Rotas
app.use('/api/formulario', clienteRoutes)

// Rota padrão para lidar com o servidor
app.all('*', (req, res) => {
  res.status(404).send('Endpoint não encontrado')
})

module.exports = app
