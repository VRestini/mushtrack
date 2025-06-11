const database = require('../database/config');

// 1. Buscar parâmetros ideais do cogumelo + estágio, baseado no sensor
async function verificarAlertasPorSensor(sensor_id, temperatura, umidade) {
  const query = `
    SELECT 
      c.nome AS cogumelo,
      e.tipo AS estagio,
      p.temp_minima, p.temp_maxima,
      p.umi_minima, p.umi_maxima
    FROM sensor s
    JOIN estufa est ON s.estufa_id = est.id
    JOIN cogumelo c ON est.cogumelo_id = c.id
    JOIN parametro p ON p.cogumelo_id = c.id
    JOIN estagio e ON p.estagio_id = e.id
    WHERE s.id = ?;
  `;

  const [linhas] = await database.execute(query, [sensor_id]);

  if (linhas.length === 0) {
    return null; // Sensor não encontrado ou sem parâmetros
  }

  const parametros = linhas[0];

  let descricao = null;

  if (temperatura < parametros.temp_minima) {
    descricao = `Temperatura baixa para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
  } else if (temperatura > parametros.temp_maxima) {
    descricao = `Temperatura alta para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
  } else if (umidade < parametros.umi_minima) {
    descricao = `Umidade baixa para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
  } else if (umidade > parametros.umi_maxima) {
    descricao = `Umidade alta para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
  }

  return { descricao };
}


// 2. Salvar alerta
function salvarAlerta(dados_id, sensor_id, descricao) {
  const query = `
    INSERT INTO alerta (dados_id, sensor_id, descricao)
    VALUES (?, ?, ?);
  `;
  return database.execute(query, [dados_id, sensor_id, descricao]);
}

// 3. Listar todos os alertas (para alertaController)
function listarAlertas() {
  const query = `
    SELECT a.id, a.data_alerta, a.descricao,
           s.nome AS sensor, est.nome AS estufa, c.nome AS cogumelo
    FROM alerta a
    JOIN sensor s ON a.sensor_id = s.id
    JOIN estufa est ON s.estufa_id = est.id
    JOIN cogumelo c ON est.cogumelo_id = c.id
    ORDER BY a.data_alerta DESC;
  `;
  return database.execute(query);
}

module.exports = {
  verificarAlertasPorSensor,
  salvarAlerta,
  listarAlertas
};
