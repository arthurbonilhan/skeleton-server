const { validationResult } = require('express-validator')
const Cliente = require('../models/Cliente')

// Endpoint para capturar dados do formulário com validação
const captarCliente = async (req, res) => {
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

// Endpoint para listar todos os dados capturados
const listarClientes = async (req, res) => {
  const clientes = await Cliente.find()
  res.json(clientes)
}

module.exports = {
  captarCliente,
  listarClientes,
}
