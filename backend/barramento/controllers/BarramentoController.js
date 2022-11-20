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
            axios.post('http://localhost:3000/api/eventos', evento);
            //Repassa o conteudo ao microsservico de consultas por especialidade
            axios.post('http://localhost:6000/api/eventos', evento);
        }
        
        res.status(200).send({ msg: "ok" });
        //res.json(evento);
    }
}