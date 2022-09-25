const PacienteService = require('../services/PacienteService');

module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {error:'', result:[]};

        let pacientes = await PacienteService.buscarTodos();

        for(let i in pacientes){
            json.result.push({
                id: pacientes[i].id,
                nome: pacientes[i].nome,
                estado: pacientes[i].status,
                prioridade: pacientes[i].prioridade
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
        let estado = req.body.estado;
        let prioridade = req.body.prioridade;
        
        if(nome && estado && prioridade){
            let pacienteId = await PacienteService.inserir(nome, estado, prioridade);
            json.result = {
                id: pacienteId,
                nome,
                estado,
                prioridade
            };
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
        
        if(id && nome && estado && prioridade){
            await PacienteService.alterar(id, nome, estado, prioridade);
            json.result = {
                id,
                nome,
                estado,
                prioridade
            };
        }else{
            json.error = 'Campos não enviados'
        }

        res.json(json);
    }
}