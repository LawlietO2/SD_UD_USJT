const LoginService = require('../services/LoginService');
const amqp = require('amqplib/callback_api');

module.exports = {
    verificarLogin: async (req, res)=>{
        let json = {error:'', result:{}};
        let especialidade = req.params.especialidade.split('\"').join("");
        let retorno = await LoginService.verificarLogin(especialidade);

        console.log(retorno)

        if(retorno.logado){
            json.result = {
                logado: 1
            }
        }
        else{
            json.result = {
                logado: 0
            }
        }
        res.json(json);
    },
    setLogin: async (req, res)=>{
        let json = {error:'', result:{}};
        let especialidade = req.params.especialidade.split('\"').join("");
       let retorno = await LoginService.setLogin(especialidade);
        if(retorno.logado){
            json.result = {
                logado: 1
            }
        }
        else{
            json.result = {
                logado: 0
            }
        }
        res.json(json);
    },
    resetLoginConfigs: async (req, res)=>{
       await LoginService.resetLoginConfigs();

    },
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
