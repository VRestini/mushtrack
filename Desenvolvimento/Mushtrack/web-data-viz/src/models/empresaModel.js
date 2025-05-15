var database = require("../database/config");

function registrar(email, cnpj, nomeEmpresa, nomeRepresentante) {
    
  var instrucaoSql = `
      INSERT INTO Empresa (nome_Empresa, cnpj_Empresa, email_Empresa, Nome_Representante) VALUES ('${nomeEmpresa}', '${cnpj}', '${email}', '${nomeRepresentante}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { registrar };
