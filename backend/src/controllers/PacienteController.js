const PacienteService = require('../services/PacienteService');
const amqp = require('amqplib/callback_api');
const ShortUniqueId = require('short-unique-id');
const axios = require('axios');

module.exports = {
    buscarPosicaoPaciente: async (req, res)=>{
        
        let json = {error:'', result:[]};
       
        let pacientes = await PacienteService.buscarPosicaoPaciente();
        
        console.log(pacientes)
        let id = req.params.id;
        let nome;
       
        for(let i in pacientes){
            let wrk = pacientes[i].consulta_cod
            if(wrk == id){
                nome = pacientes[i].nome;
            }
          }

          for(let i in pacientes){
            switch (pacientes[i].prioridade) {
                case "critica":
                  pacientes[i].prioridadeHelper = 1;
                  break;
                case "alta":
                  pacientes[i].prioridadeHelper = 2;
                  break;
                case "normal":
                  pacientes[i].prioridadeHelper = 3;
                  break;
                case "baixa":
                  pacientes[i].prioridadeHelper = 4;
                  break;
                default:
                  pacientes[i].prioridadeHelper = 4;
                  break;
              }
        }
        pacientes.sort(function(a,b) { 
              return a.datalocal.getTime() - b.datalocal.getTime(); 
        });
        pacientes.sort(function(a,b) { 
            return a.prioridadeHelper - b.prioridadeHelper; 
        });

        //critica 1
        //alta    2
        //normal  3
        //baixa   4   
        const index = pacientes.findIndex(object => {
            return object.consulta_cod == id;
          });   
          
          json.result = {
            nome: nome,
            queueId: index + 1
        };
        console.log(json.result)

        
        res.json(json);
    },
    buscarTodos: async (req, res)=>{
        let json = {error:'', result:[]};

        let pacientes = await PacienteService.buscarTodos();

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
        let paciente = await PacienteService.buscarUm(id);
        
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
        let especialidade = req.body.especialidade;
        if(nome && estado && prioridade && data){
            let pacienteId = await PacienteService.inserir(nome, estado, prioridade, data, consulta_cod, especialidade);
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
            PacienteService.enviarEvento(json.result); //O barramento devera identificar a inclusão do paciente e realizar a adição do mesmo na tabela de especialidades
            
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
            await PacienteService.alterar(id, nome, estado, prioridade, data);
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

        let paciente = await PacienteService.excluir(req.params.id);

        res.json(json);
    },
    receberEvento: async (req, res)=>{
      console.log(req.body);
      res.status(200).send({ msg: "ok" });
    }
}