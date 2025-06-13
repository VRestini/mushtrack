var database = require("../database/config");


function buscarParametro(idCogumelo, idEstagio) {
    
  var instrucaoSql = `
      SELECT temp_minima,temp_maxima, umi_minima, umi_maxima FROM parametro JOIN cogumelo ON cogumelo.id =  parametro.cogumelo_id JOIN estagio ON estagio.id = parametro.estagio_id WHERE parametro.cogumelo_id = '${idCogumelo}' AND parametro.estagio_id = '${idEstagio}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscarParametro
 };
