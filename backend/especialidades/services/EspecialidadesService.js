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
    buscarUm: (id) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM pacientes WHERE ID = ?', [id] , (error, results)=>{
                if(error){ rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },
    inserir: (nome, estado, prioridade, data, consulta_cod, especialidade) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('INSERT INTO consultas (nome, status, prioridade, datalocal, consulta_cod, especialidade) VALUES (?, ?, ?, ?, ?, ?)', [nome, estado, prioridade, data, 
                                                                                                                                            consulta_cod, especialidade] , (error, results)=>{
                if(error){ rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },
    alterar: (id, nome, estado, prioridade, data) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE pacientes SET nome = ?, status = ?, prioridade = ?, datalocal = ? WHERE id = ?', [nome, estado, prioridade, data, id] , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
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
    atualizarStatusInicioDeAtendimento: (consulta_cod) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE consultas SET status = \'Em andamento\'  WHERE consulta_cod = ?', [consulta_cod] , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
    atualizarStatusFimDeAtendimento: (queixa, consulta_cod) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE consultas SET status = \'Finalizado\', informacoes_paciente = ?  WHERE consulta_cod = ?', [queixa, consulta_cod] , (error, results)=>{
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
                    rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                }else{
                    aceito(false);
                }
            });
        });
    }
};