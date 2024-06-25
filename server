const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Conexão com o MongoDB
const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err))

// Schema do cliente
const clienteSchema = new mongoose.Schema({
  tipoServico: String,
  nome: String,
  telefone: String,
  email: String,
  cidade: String,
  quantidadeMetros: Number,
})

const Cliente = mongoose.model('Cliente', clienteSchema)

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Endpoint para capturar dados do formulário com validação
app.post(
  '/api/formulario/captacao',
  [
    body('tipoServico').notEmpty().withMessage('Tipo de serviço é obrigatório'),
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('telefone').isLength({ min: 10, max: 15 }).withMessage('Telefone deve ter entre 10 e 15 caracteres'),
    body('email').isEmail().withMessage('Email deve ser válido'),
    body('cidade').notEmpty().withMessage('Cidade é obrigatória'),
    body('quantidadeMetros').isNumeric().withMessage('Quantidade de metros deve ser um número'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const cliente = new Cliente(req.body)
    await cliente.save()
    res.status(201).json({
      status: 'sucesso',
      mensagem: 'Dados recebidos com sucesso',
    })
  }
)

// Endpoint para listar todos os dados capturados
app.get('/api/formulario/captacao', async (req, res) => {
  const clientes = await Cliente.find()
  res.json(clientes)
})

// Rota padrão para lidar com o servidor
app.all('*', (req, res) => {
  res.status(404).send('Endpoint não encontrado')
})

// Exporta o app para ser usado pela Vercel
module.exports = app
