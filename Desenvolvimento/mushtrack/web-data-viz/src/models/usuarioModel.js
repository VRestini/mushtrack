var database = require("../database/config");

function autenticar(email, senha) {
    console.log("[usuarioModel] Autenticando:", email);

    const instrucaoSql = `
     SELECT id, nome, email,
      empresa_id as empresaId FROM usuario 
      WHERE email = '${email}' AND senha = '${senha}';

    `;


    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha, status, empresa_id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, status, empresa_id);

     var instrucaoSql = `
        INSERT INTO usuario (email, senha VALUES ('${email}', '${senha}');
    `;
    return database.executar(instrucaoSql, [nome, email, senha, status, empresa_id]);
}

module.exports = {
    autenticar,
    cadastrar
};




