const mysql = require("mysql2");

// Pool de conexões com o banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@4976Loren',
    database: 'MushTrack',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para executar instruções SQL com parâmetros (evita SQL Injection)
function executar(instrucao, params = []) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise((resolve, reject) => {
        pool.query(instrucao, params, (erro, resultados) => {
            if (erro) {
                console.error("Erro ao executar a query:", erro);
                reject(erro);
            } else {
                resolve(resultados);
            }
        });
    });
}

module.exports = {
    executar
};
