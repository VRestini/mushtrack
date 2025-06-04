var database = require("../database/config");


function buscarCogumelo(idEmpresa, idEstufa) {
    
  var instrucaoSql = `
      SELECT nome FROM cogumelo JOIN estufa ON estufa.cogumelo_id = cogumelo.id JOIN empresa ON estufa.empresa_id = '${idEmpresa}' ;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
    buscarCogumelo
 };
