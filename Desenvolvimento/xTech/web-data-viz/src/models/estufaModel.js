var database = require("../database/config");


function buscarEstufas(idEmpresa, cogumeloNome) {

  var instrucaoSql = `
      SELECT estufa.id, estufa.nome, cogumelo.id as idCogumelo FROM estufa JOIN empresa ON estufa.empresa_id = empresa.id  JOIN cogumelo ON cogumelo.nome = '${cogumeloNome}' WHERE empresa.id ='${idEmpresa}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function cadastrarEstufas(nome, cogumelo_id, empresa_id,estagio_id) {

  var instrucaoSql = `
      INSERT INTO estufa (nome, cogumelo_id, empresa_id, estagio_id) values ('${nome}','${cogumelo_id}','${empresa_id}','${estagio_id}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarEstufas,
  cadastrarEstufas
};
