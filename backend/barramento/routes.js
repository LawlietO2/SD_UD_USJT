const express = require('express');
const router = express.Router();

const PacienteController = require('./controllers/PacienteController');


router.post('/eventos', PacienteController.redirecionarEventos);

module.exports = router;