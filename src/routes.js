const express = require('express');
const router = express.Router();

const PacienteController = require('./controllers/PacienteController');

//aqui buscamos todos os pacientes cadastrados no db
router.get('/pacientes', PacienteController.buscarTodos);
//aqui buscamos apenas um paciente cadastrado no db
router.get('/paciente/:id', PacienteController.buscarUm);

module.exports = router;