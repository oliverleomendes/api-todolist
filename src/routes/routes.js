const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const UserController = require('../controllers/UserController')
const verificarToken = require('../middleware/authMiddleware')
const TwoFaController = require('../controllers/TwoFaController')
const PaymentController = require('../controllers/PaymentController')

router.post('/usuario/criar', UserController.cadastrarUsuario)
router.post('/usuario/autenticar', UserController.autenticarUsuario)
router.get('/usuarios', verificarToken, UserController.listarUsuarios)
router.get('/usuario/:id', verificarToken, UserController.listarUmUsuario)
router.put('/usuario/atualizar/:id', verificarToken, UserController.atualizarUsuario)
router.delete('/usuario/excluir/:id', verificarToken, UserController.removerUsuario)
router.put('/usuario/redefinirSenha/:id', UserController.redefinirSenha)

router.get('/2fa/gerar', TwoFaController.gerarToken)
router.post('/2fa/validar', TwoFaController.validarToken)

router.post('/tarefa/criar', verificarToken, TaskController.novaTarefa)
router.get('/tarefas', verificarToken, TaskController.listarTarefas)
router.get('/tarefa/:id', verificarToken, TaskController.listarUmaTarefa) 
router.put('/tarefa/atualizar/:id', verificarToken, TaskController.atualizarTarefa)
router.delete('/tarefa/excluir/:id', verificarToken, TaskController.removerTarefa)

router.post('/pagamento', verificarToken, PaymentController.processarPagamento)

module.exports = router