const database = require('../database/config');

function inserir(sensor_id, temperatura, umidade) {
  const instrucao = `
    INSERT INTO dados (sensor_id, temperatura, umidade)
    VALUES (?, ?, ?);
  `;
  return database.execute(instrucao, [sensor_id, temperatura, umidade]);
}
function buscarUmidadeTemperatura(id_estufa) {
  var instrucaoSql = `
       SELECT 
      s.id as sensor_id,
      s.nome as sensor_nome,
      d.temperatura,
      d.umidade,
      d.data_captura
    FROM dados d
    JOIN sensor s ON d.sensor_id = s.id
    WHERE s.estufa_id = '${id_estufa}'
    ORDER BY d.data_captura DESC LIMIT 7; 
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}



function buscarUmidadeTemperaturaHistorico(sensor_id) {
  var instrucaoSql = `
      
SELECT 
      s.id as sensor_id,
      s.nome as sensor_nome,
      d.temperatura,
      d.umidade,
      d.data_captura
    FROM dados d
    JOIN sensor s ON d.sensor_id = s.id
    WHERE s.estufa_id = '${id_estufa}'
    ORDER BY d.data_captura DESC; 
  
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
  inserir,
  buscarUmidadeTemperatura,
  buscarUmidadeTemperaturaHistorico
};
