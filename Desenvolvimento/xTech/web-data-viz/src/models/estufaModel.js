var database = require("../database/config");


function buscarEstufas(idEmpresa) {
    
  var instrucaoSql = `
      SELECT id, nome FROM estufa JOIN empresa ON estufa.empresa_id = '${idEmpresa}' ;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscarEstufas
 };
