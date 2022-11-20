const db = require('../db');
const axios = require('axios');

module.exports = {
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM pacientes', (error, results)=>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    enviarEvento: async (body) =>{
        await axios.post('http://localhost:10000/api/eventos', {
                tipo: "PacienteInserido",
                dados: {
                    body
                }
            }).catch((error) => {
                console.error(error);
              });
    }

};