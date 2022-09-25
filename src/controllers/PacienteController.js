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
    }
}