import express from 'express'
import { body } from 'express-validator'
import clienteController from '../controllers/clienteController'

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
  clienteController.createCliente
)

router.get('/captacao', clienteController.getAllClientes)

export default router
