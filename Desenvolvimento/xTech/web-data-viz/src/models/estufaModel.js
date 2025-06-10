var database = require("../database/config");


function buscarEstufas(idEmpresa, cogumeloNome) {
    
  var instrucaoSql = `
      SELECT estufa.id, estufa.nome FROM estufa JOIN empresa ON estufa.empresa_id = empresa.id  JOIN cogumelo ON cogumelo.nome = '${cogumeloNome}' WHERE empresa.id ='${idEmpresa}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscarEstufas
 };
