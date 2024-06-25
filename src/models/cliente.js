const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
  tipoServico: { type: String, required: true },
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  cidade: { type: String, required: true },
  quantidadeMetros: { type: Number, required: true },
})

module.exports = mongoose.model('Cliente', clienteSchema)
