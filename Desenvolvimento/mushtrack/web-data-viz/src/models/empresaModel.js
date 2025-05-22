var database = require("../database/config");

function registrar(email, cnpj, nomeEmpresa, nomeRepresentante, senhaEmpresa) {
    
  var instrucaoSql = `
      INSERT INTO empresa (nome, cnpj, senha, email, nome_representante) VALUES ('${nomeEmpresa}', '${cnpj}', '${senhaEmpresa}', '${email}', '${nomeRepresentante}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function entrar(email, senha) {
  console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
  var instrucao = `
        SELECT * FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = { registrar, entrar };
