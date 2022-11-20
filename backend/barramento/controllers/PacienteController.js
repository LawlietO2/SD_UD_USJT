const PacienteService = require('../services/PacienteService');
const amqp = require('amqplib/callback_api');
const ShortUniqueId = require('short-unique-id');
const axios = require('axios');

module.exports = {
    redirecionarEventos: async (req, res)=>{
        let json = {error:'', result:[]};
        const evento = req.body;
        let tipo = req.body.tipo;

        PacienteInserido
        if(tipo == "PacienteInserido"){
            axios.post('http://localhost:3000/api/eventos', evento);
            axios.post('http://localhost:6000/api/eventos', evento);
        }


        //envia o evento para o microsserviço de observações
        //axios.post('http://localhost:5000/eventos', evento);
        //envia o evento para o microsserviço de consulta
        //axios.post("http://localhost:6000/eventos", evento);
        res.status(200).send({ msg: "ok" });
        //res.json(evento);
    }
}