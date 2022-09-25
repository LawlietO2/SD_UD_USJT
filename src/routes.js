const express = require('express');
const router = express.Router();

const PacienteController = require('./controllers/PacienteController');

router.get('/pacientes', PacienteController.buscarTodos);

module.exports = router;