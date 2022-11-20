const PacienteService = require('../services/EspecialidadesService');
const amqp = require('amqplib/callback_api');
const ShortUniqueId = require('short-unique-id');
const axios = require('axios');

module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {error:'', result:[]};

        let pacientes = await EspecialidadeService.buscarTodos();

        for(let i in pacientes){
            json.result.push({
                id: pacientes[i].id,
                nome: pacientes[i].nome,
                estado: pacientes[i].status,
                prioridade: pacientes[i].prioridade,
                data: pacientes[i].datalocal,
                especialidade: pacientes[i].especialidade,
                consulta_cod: pacientes[i].consulta_cod
            });
        }
    res.json(json);
    },
    buscarUm: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let paciente = await EspecialidadeService.buscarUm(id);
        
        if(paciente){
            json.result = paciente;
        }
        console.log(json);
        res.json(json);
    },
    inserir: async (req, res)=>{
        let json = {error:'', result:{}};

        let nome = req.body.nome;
        let estado = "Pendente";
        let prioridade = req.body.prioridade;
        let data = new Date();
        const uid = new ShortUniqueId({ length: 10 });
        let consulta_cod = uid(); // p0ZoB1FwH6
        let especialidades = req.body.especialidade;
        if(nome && estado && prioridade && data){
            let pacienteId = await EspecialidadeService.inserir(nome, estado, prioridade, data, consulta_cod, especialidades);
            json.result = {
                id: pacienteId,
                nome,
                estado,
                prioridade,
                data,
                consulta_cod,
                especialidades
            };
           
            //Envia evento ao barramento
            EspecialidadeService.enviarEvento(json.result); //O barramento devera identificar a inclusão do paciente e realizar a adição do mesmo na tabela de especialidades
            
        }else{
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },
    alterar: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let nome = req.body.nome;
        let estado = req.body.estado;
        let prioridade = req.body.prioridade;
        let data = new Date();

        if(id && nome && estado && prioridade && data){
            await EspecialidadeService.alterar(id, nome, estado, prioridade, data);
            json.result = {
                id,
                nome,
                estado,
                prioridade,
                data
            };
        }else{
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },
    excluir: async (req, res)=>{
        let json = {error:'', result:{}};

        let paciente = await EspecialidadeService.excluir(req.params.id);

        res.json(json);
    },
    receberEvento: async (req, res)=>{


        
      console.log(req.body);
      res.status(200).send({ msg: "ok" });
    }
}