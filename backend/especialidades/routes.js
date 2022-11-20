const express = require('express');
const router = express.Router();

const EspecialidadesController = require('./controllers/EspecialidadesController');

//aqui buscamos todos os pacientes cadastrados no db
router.get('/pacientes', EspecialidadesController.buscarTodos);
//aqui buscamos apenas um paciente cadastrado no db
router.get('/paciente/:id', EspecialidadesController.buscarUm);
//aqui inserimos um paciente no db
router.post('/paciente', EspecialidadesController.inserir);
//aqui alteramos um paciente no db
router.put('/paciente/:id', EspecialidadesController.alterar);
//aqui deletamos um paciente no db
router.delete('/paciente/:id', EspecialidadesController.excluir);
//Redirecionamento do barramento apos inclusao de paciente, devemos incluir na base de especialidades.
router.post('/eventos', EspecialidadesController.receberEvento);//ALTERAR PacienteController para EspecialidadesController

module.exports = router;