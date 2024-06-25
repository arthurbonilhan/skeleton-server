const express = require('express')
const { body, validationResult } = require('express-validator')
const Cliente = require('../models/Cliente')
const router = express.Router()

router.post(
  '/captacao',
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

router.get('/captacao', async (req, res) => {
  const clientes = await Cliente.find()
  res.json(clientes)
})

module.exports = router
