const express = require('express');
const router = express.Router();

const BarramentoController = require('./controllers/BarramentoController');


router.post('/eventos', BarramentoController.redirecionarEventos);

module.exports = router;