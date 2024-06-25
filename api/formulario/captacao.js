import { connectToDatabase } from '../utils/mongodb'
import { validationResult, body } from 'express-validator'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const clienteSchema = {
  tipoServico: String,
  nome: String,
  telefone: String,
  email: String,
  cidade: String,
  quantidadeMetros: Number,
}

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

    const cliente = req.body
    const { db } = await connectToDatabase()
    await db.collection('clientes').insertOne(cliente)
    res.status(201).json({
      status: 'sucesso',
      mensagem: 'Dados recebidos com sucesso',
    })
  }
)

app.get('/formulario/captacao', async (req, res) => {
  const { db } = await connectToDatabase()
  const clientes = await db.collection('clientes').find().toArray()
  res.json(clientes)
})

export default app
