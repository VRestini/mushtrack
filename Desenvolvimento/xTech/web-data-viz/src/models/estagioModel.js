var database = require("../database/config");


function buscarParametro(idEstufa) {
    
  var instrucaoSql = `
      SELECT estagio.tipo FROM estagio JOIN estufa ON estagio.id = '${idEstufa}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscarParametro
 };
