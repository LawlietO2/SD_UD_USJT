const PacienteService = require('../services/PacienteService');

module.exports = {
    buscarTodosOrdenado: async (req, res)=>{
        let json = {error:'', result:[]};
       
        let pacientes = await PacienteService.buscarTodos();

        let id = req.params.id;
       
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
            return object.id == id;
          });   
          json.result.push({
            queueId: index + 1
        });
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
    },
    excluir: async (req, res)=>{
        let json = {error:'', result:{}};

        let paciente = await PacienteService.excluir(req.params.id);

        res.json(json);
    }
}