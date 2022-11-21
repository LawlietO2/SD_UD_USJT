const EspecialidadesService = require('../services/EspecialidadesService');
const amqp = require('amqplib/callback_api');
const ShortUniqueId = require('short-unique-id');
const axios = require('axios');

module.exports = {
    excluir: async (req, res)=>{
        let json = {error:'', result:{}};

        let paciente = await EspecialidadesService.excluir(req.params.id);

        res.json(json);
    },
    receberEvento: async (req, res)=>{
        let json = {error:'', result:{}};
        let estado = "Pendente";
        let nome = req.body.dados.nome;
        let prioridade = req.body.dados.prioridade;
        let data = new Date();
        let consulta_cod = req.body.dados.consulta_cod;
        let especialidade = req.body.dados.especialidade;

        if(nome && estado && prioridade && data){
            let pacienteId = await EspecialidadesService.inserir(nome, estado, prioridade, data, consulta_cod, especialidade);
            json.result = {
                id: pacienteId,
                nome,
                estado,
                prioridade,
                data,
                consulta_cod,
                especialidade
            };
            //Envia evento ao barramento
            EspecialidadesService.enviarEvento(json.result); //O barramento devera identificar a inclusão do paciente e realizar a adição do mesmo na tabela de especialidades
            
        }else{
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },
    atualizarStatusInicioDeAtendimento: async (req, res)=>{
        let json = {error:'', result:{}};

        let retorno = await EspecialidadesService.atualizarStatusInicioDeAtendimento(req.params.consulta_cod);

        res.json(json);
    },
    atualizarStatusFimDeAtendimento: async (req, res)=>{
        let json = {error:'', result:{}};
        let retorno = await EspecialidadesService.atualizarStatusFimDeAtendimento(req.body.queixa, req.body.consulta_cod);

        res.json(json);
    },
    getConsultasPorEspecialidade: async (req, res)=>{
        let json = {error:'', result:[]};
        let consultas = await EspecialidadesService.getConsultasPorEspecialidade(req.params.especialidade);

        if(Array.isArray(consultas)){
            for(let i in consultas){        
                
                json.result.push({
                    id: consultas[i].id,
                    nome: consultas[i].nome,
                    estado: consultas[i].status,
                    prioridade: consultas[i].prioridade,
                    data: consultas[i].datalocal,
                    especialidade: consultas[i].especialidade,
                    consulta_cod: consultas[i].consulta_cod
                });
            }
        }
        else{
            json.result = {
                id: consultas.id,
                nome: consultas.nome,
                estado: consultas.status,
                prioridade: consultas.prioridade,
                data: consultas.datalocal,
                especialidade: consultas.especialidade,
                consulta_cod: consultas.consulta_cod
            };
        }
        res.json(json);
    }
}