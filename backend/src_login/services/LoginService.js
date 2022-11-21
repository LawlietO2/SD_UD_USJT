const db = require('../db');

module.exports = {
    verificarLogin: (especialidade) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT logado FROM especialidades WHERE especialidade = ?', [especialidade] , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
    setLogin: (especialidade) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE especialidades SET logado = 1 WHERE especialidade = ?', [especialidade] , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
    resetLoginConfigs: () =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('UPDATE especialidades SET logado = 0 WHERE especialidade IS NOT NULL ;' , (error, results)=>{
                if(error){
                    rejeitado(error); return; }
                aceito(results);
                
            });
        });
    },
    VerificarLogin: (login) =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM especialidades WHERE login = ?', [login] , (error, results)=>{
                if(error){ rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },
};