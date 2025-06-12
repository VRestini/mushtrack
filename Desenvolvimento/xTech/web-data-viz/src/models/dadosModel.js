const database = require('../database/config');

function inserir(sensor_id, temperatura, umidade) {
  const instrucao = `
    INSERT INTO dados (sensor_id, temperatura, umidade)
    VALUES (?, ?, ?);
  `;
  return database.execute(instrucao, [sensor_id, temperatura, umidade]);
}
function buscarUmidade(sensor_id) {
  var instrucaoSql = `
        SELECT umidade from dados JOIN sensor ON dados.sensor_id = '${sensor_id}' LIMIT 5 ORDER BY data_captura DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function buscarTemperatura(sensor_id) {
  var instrucaoSql = `
       SELECT temperatura from dados JOIN sensor ON dados.sensor_id = '${sensor_id}' LIMIT 5 ORDER BY data_captura DESC;
   `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUmidadeHistorico(sensor_id) {
  var instrucaoSql = `
       SELECT umidade from dados JOIN sensor ON dados.sensor_id = '${sensor_id}';
   `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function buscarTemperaturaHistorico(sensor_id) {
  var instrucaoSql = `
      SELECT temperatura from dados JOIN sensor ON dados.sensor_id = '${sensor_id}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
  inserir,
  buscarUmidade,
  buscarTemperatura,
  buscarUmidadeHistorico,
  buscarTemperaturaHistorico
};
