const db = require('../db');

module.exports = {
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM pacientes WHERE status = ?', ['pendente'] , (error, results)=>{
                if(error){ rejeitado(error); return; }
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
    inserir: (nome, estado, prioridade) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('INSERT INTO pacientes (nome, status, prioridade) VALUES (?, ?, ?)', [nome, estado, prioridade] , (error, results)=>{
                if(error){ rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },
    alterar: (id, nome, estado, prioridade) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE pacientes SET nome = ?, status = ?, prioridade = ? WHERE id = ?', [nome, estado, prioridade, id] , (error, results)=>{
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
    }
};