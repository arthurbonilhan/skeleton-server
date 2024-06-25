const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator')
const cors = require('cors')

const app = express()
const PORT = 3001
require('dotenv').config()
app.use(bodyParser.json())

const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

const clienteSchema = new mongoose.Schema({
  tipoServico: String,
  nome: String,
  telefone: String,
  email: String,
  cidade: String,
  quantidadeMetros: Number,
})

const Cliente = mongoose.model('Cliente', clienteSchema)

app.use(bodyParser.json())
app.use(cors()) // Adicionando o middleware cors

// Endpoint para capturar dados do formulário com validação
app.post(
  '/formulario/captacao',
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
app.get('/formulario/captacao', async (req, res) => {
  const clientes = await Cliente.find()
  res.json(clientes)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
