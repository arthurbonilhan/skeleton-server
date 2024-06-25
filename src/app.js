import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import clienteRoutes from './routes/clienteRoutes.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api/formulario', clienteRoutes)

app.all('*', (req, res) => {
  res.status(404).send('Endpoint não encontrado')
})

export default app
