const express = require('express');
const router = express.Router();

const EspecialidadesController = require('./controllers/EspecialidadesController');

//Redirecionamento do barramento apos inclusao de paciente, devemos incluir na base de especialidades.
router.post('/eventos', EspecialidadesController.receberEvento);
router.post('/inicio-consulta/:cod_consulta', EspecialidadesController.atualizarStatusInicioDeAtendimento);
router.post('/fim-consulta/:cod_consulta', EspecialidadesController.atualizarStatusFimDeAtendimento);
router.get('/consultas-especialidade/:especialidade', EspecialidadesController.getConsultasPorEspecialidade);

module.exports = router;