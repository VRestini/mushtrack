var database = require("../database/config");

function registrar(email, cnpj, nomeEmpresa, nomeRepresentante, senhaEmpresa) {
    
  var instrucaoSql = `
      INSERT INTO Empresa (nome, cnpj, senha, email, nome_representante) VALUES ('${nomeEmpresa}', '${cnpj}', '${senhaEmpresa}', '${email}', '${nomeRepresentante}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function entrar(email,senha){
  var instrucaoSql = `SELECT INTO nome, senha, email_Empresa WHERE senha = '${senha}' and email_Empresa = '${email}'`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

module.exports = { registrar };
