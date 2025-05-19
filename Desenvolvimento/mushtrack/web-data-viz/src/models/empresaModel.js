var database = require("../database/config");

function registrar(email, cnpj, nomeEmpresa, nomeRepresentante, senhaEmpresa) {
    
  var instrucaoSql = `
      INSERT INTO Empresa (nome_Empresa, cnpj_Empresa, email_Empresa, Nome_Representante, senha_Empresa) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${nomeRepresentante}', '${senhaEmpresa}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function logar(email,senha){
  var instrucaoSql = `SELECT INTO nome_Empresa, senha_Empresa, email_Empresa WHERE senha_Empresa = '${senha}' and email_Empresa = '${email}'`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

module.exports = { registrar };
