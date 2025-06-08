const database = require('../database/config');

function inserir(sensor_id, temperatura, umidade) {
  const instrucao = `
    INSERT INTO dados (sensor_id, temperatura, umidade)
    VALUES (?, ?, ?);
  `;
  return database.execute(instrucao, [sensor_id, temperatura, umidade]);
}

module.exports = {
  inserir
};
