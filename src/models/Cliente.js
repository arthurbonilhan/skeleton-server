const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
  tipoServico: String,
  nome: String,
  telefone: String,
  email: String,
  cidade: String,
  quantidadeMetros: Number,
})

module.exports = mongoose.model('Cliente', clienteSchema)
