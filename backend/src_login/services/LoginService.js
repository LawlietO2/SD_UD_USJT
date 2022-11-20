const db = require('../db');

module.exports = {
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