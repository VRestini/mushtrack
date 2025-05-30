var database = require("../database/config");


function cadastrar(tipo, nome, status, numeroSeries, dtManutencao, dtInstalacao, posicao) {
    
  var instrucaoSql = `
      INSERT INTO empresa (tipo, nome, status, numero_serie, dt_instalacao, dt_manutencao, posicao) VALUES ('${tipo}', '${nome}', '${status}', '${numeroSeries}', '${dtManutencao}', '${dtInstalacao}', '${posicao}', );
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  cadastrar
 };
