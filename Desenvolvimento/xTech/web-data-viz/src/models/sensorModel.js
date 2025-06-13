
var database = require("../database/config");


function cadastrar(tipo, nome, status, numeroSeries, dtManutencao, dtInstalacao, posicao, id_estufa) {
   
  
  var instrucaoSql = `
  INSERT INTO sensor (tipo, nome, status, numero_serie, dt_instalacao, dt_manutencao, posicao, estufa_id) 
  VALUES ('${tipo}', '${nome}', '${status}', '${numeroSeries}', '${dtInstalacao}', '${dtManutencao}', '${posicao}', '${id_estufa}');
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function listarPorEmpresa(id_empresa) {
  var instrucaoSql = `
      SELECT s.* 
      FROM sensor s
      JOIN estufa e ON s.estufa_id = e.id
      WHERE e.empresa_id = ${id_empresa};
  `;
  
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  listarPorEmpresa
 };