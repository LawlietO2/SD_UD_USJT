const PacienteService = require('../services/BarramentoService');
const amqp = require('amqplib/callback_api');
const ShortUniqueId = require('short-unique-id');
const axios = require('axios');

module.exports = {
    redirecionarEventos: async (req, res)=>{
        let json = {error:'', result:[]};
        const evento = req.body;
        let tipo = req.body.tipo;
        if(tipo == "PacienteInserido"){
            //Informa o sucesso da criacao ao microsservico de pacientes
            axios.post('http://localhost:' + process.env.PORT + '/api/eventos', evento);
            //Repassa o conteudo ao microsservico de consultas por especialidade
            axios.post('http://localhost:' + process.env.PORT_ESPECIALIDADE +'/api/eventos', evento);
        }
        else if(tipo == "FimDeAtendimento"){
            console.log(evento)
            axios.post('http://localhost:' + process.env.PORT +'/api/eventos-fim-atendimento', evento);
            axios.post('http://localhost:' + process.env.PORT_ESPECIALIDADE +'/api/eventos-fim-atendimento', evento);
        }

        res.status(200).send({ msg: "ok" });
        //res.json(evento);
    }
}