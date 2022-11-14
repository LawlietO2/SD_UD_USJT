const LoginService = require('../services/LoginService');
const amqp = require('amqplib/callback_api');

module.exports = {
    VerificarLogin: async (req, res)=>{
        let json = {error:'', result:[]};        

        let login = req.body.login;
        let senha = req.body.senha;
        let login_result = await LoginService.VerificarLogin(login); // ALTERAR : PacienteService por LoginService
        let senha_retorno = login_result.senha;

        if(senha == senha_retorno){
            json.result = {
                status: 1,  // 1 - Encontrado | 0 - Nao encontrado
                especialidade: login_result.especialidade
            };
        }
        else{
            json.result = {
                status: 0,  // 1 - Encontrado | 0 - Nao encontrado
                msg: "Usuario nao encontrado"
            };
        }
    res.json(json);
    }
}
