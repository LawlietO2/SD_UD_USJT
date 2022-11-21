const db = require('../db');
const axios = require('axios');

module.exports = {
    excluir: (id) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('DELETE FROM pacientes WHERE id = ?', [id], (error, results)=>{
                if(error){ 
                    rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    enviarEvento: async (body) =>{
        await axios.post('http://localhost:10000/api/eventos', {
                tipo: "ConsultaInserida",
                dados: {
                    body
                }
            }).catch((error) => {
                console.error(error);
              });
    },
    atualizarStatusInicioDeAtendimento: (id) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE pacientes SET estado = \'Em andamento\'  WHERE id = ?', [id] , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
    atualizarStatusFimDeAtendimento: (id) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE pacientes SET estado = \'Finalizado\'  WHERE id = ?', [id] , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
    getConsultasPorEspecialidade: (especialidade) =>{
        let especialidade_wrk = especialidade.split('\"').join("")        
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM consultas WHERE especialidade = ?', [especialidade_wrk] , (error, results)=>{
                if(error){ 
                    console.log("AQUi")
                    rejeitado(error); return; }
                if(results.length > 0){
                    console.log("RESULT")
                    console.log(results[0])
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    }
};