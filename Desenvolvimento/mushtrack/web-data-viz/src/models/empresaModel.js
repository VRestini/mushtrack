var database = require("../database/config");

function registrar(email, cnpj, nomeEmpresa, nomeRepresentante, senhaEmpresa) {
    
  var instrucaoSql = `
      INSERT INTO empresa (nome, cnpj, senha, email, nome_representante) VALUES ('${nomeEmpresa}', '${cnpj}', '${senhaEmpresa}', '${email}', '${nomeRepresentante}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function logar(email,senha){
  var instrucaoSql = `SELECT nome, senha, email from empresa WHERE senha = '${senha}' and email = '${email}'`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

module.exports = { registrar, logar };
