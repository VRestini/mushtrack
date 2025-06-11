var database = require("../database/config");


function buscar(idEstufa, idEmpresa) {
  var instrucaoSql = `
      SELECT sensor.id FROM sensor JOIN estufa ON sensor.estufa_id = ${idEstufa} JOIN empresa ON estufa.empresa_id = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscar
 };
