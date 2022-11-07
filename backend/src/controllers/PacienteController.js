const PacienteService = require('../services/PacienteService');
const amqp = require('amqplib/callback_api');


module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {error:'', result:[]};

        let pacientes = await PacienteService.buscarTodos();

        for(let i in pacientes){
            json.result.push({
                id: pacientes[i].id,
                nome: pacientes[i].nome,
                estado: pacientes[i].status,
                prioridade: pacientes[i].prioridade,
                data: pacientes[i].datalocal
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

        if(nome && estado && prioridade && data){
            let pacienteId = await PacienteService.inserir(nome, estado, prioridade, data);
            json.result = {
                id: pacienteId,
                nome,
                estado,
                prioridade,
                data
            };
           

            // // Step 1: Create Connection
            //  amqp.connect('amqp://localhost', (connError, connection) => {
            // if (connError) {
            //     throw connError;
            // }
            // // Step 2: Create Channel
            // connection.createChannel((channelError, channel) => {
            //     if (channelError) {
            //         throw channelError;
            //     }
            //     // Step 3: Assert Queue
            //     const QUEUE = 'pacientes'
            //     channel.assertQueue(QUEUE);
            //     // Step 4: Send message to queue
            //     channel.sendToQueue(QUEUE, Buffer.from('Mensagem de teste do barramento'));
            //     console.log(`Message send ${QUEUE}`);
            //   })
            // })
            
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
    }
}