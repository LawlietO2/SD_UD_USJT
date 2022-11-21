const express = require('express');
const router = express.Router();

const LoginController = require('./controllers/LoginController');


//Consultamos o usuario na base e verificamos se o mesmo existe.
//A senha já devera vir criptografada, utiliza o modo crypto para criptografar e descriptografar a mesma.

router.post('/login', LoginController.VerificarLogin); 
router.get('/set-login/:especialidade', LoginController.setLogin);
router.get('/verificar-login/:especialidade', LoginController.verificarLogin);
router.get('/resetLoginConfigs', LoginController.resetLoginConfigs); 

module.exports = router;