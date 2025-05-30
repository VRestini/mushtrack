var database = require("../database/config");


function buscar(idEstufa, idEmpresa) {
    
  var instrucaoSql = `
      SELECT * FROM sensor JOIN estufa ON estufa.id = '${idEstufa}' JOIN empresa ON empresa.id = '${idEmpresa}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscar
 };
