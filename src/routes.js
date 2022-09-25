const express = require('express');
const router = express.Router();

const PacienteController = require('./controllers/PacienteController');

//aqui buscamos todos os pacientes cadastrados no db
router.get('/pacientes', PacienteController.buscarTodos);
//aqui buscamos apenas um paciente cadastrado no db
router.get('/paciente/:id', PacienteController.buscarUm);
//aqui inserimos um paciente no db
router.post('/paciente', PacienteController.inserir);
//aqui alteramos um paciente no db
router.put('/paciente/:id', PacienteController.alterar);

module.exports = router;