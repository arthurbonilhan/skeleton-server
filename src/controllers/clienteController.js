const { validationResult } = require('express-validator')
const Cliente = require('../models/Cliente.js')

exports.createCliente = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const cliente = new Cliente(req.body)
    await cliente.save()
    res.status(201).json({
      status: 'sucesso',
      mensagem: 'Dados recebidos com sucesso',
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar os dados' })
  }
}

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find()
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os dados' })
  }
}
