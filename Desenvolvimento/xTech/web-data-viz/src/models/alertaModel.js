const database = require('../database/config');

// Buscar parâmetros ideais e determinar severidade
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

    const [linhas] = await database.executar(query, [sensor_id]);

    if (linhas.length === 0) {
        return null;
    }

    const parametros = linhas[0];

    let descricao = null;
    let severidade = null;

    if (temperatura > 30) {
        descricao = `Temperatura crítica (>30°C) para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
        severidade = 'critico';
    } else if (temperatura < 15) {
        descricao = `Temperatura crítica (<15°C) para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
        severidade = 'critico';
    } else if (umidade > 95) {
        descricao = `Umidade crítica (>95%) para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
        severidade = 'critico';
    } else if (umidade < 70 && parametros.estagio.toLowerCase() === 'incubação') {
        descricao = `Umidade crítica (<70%) para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
        severidade = 'critico';
    } else if (umidade < 85 && parametros.estagio.toLowerCase() === 'frutificação') {
        descricao = `Umidade crítica (<85%) para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
        severidade = 'critico';
    } else if (temperatura < parametros.temp_minima || temperatura > parametros.temp_maxima || umidade < parametros.umi_minima || umidade > parametros.umi_maxima) {
        descricao = `Parâmetro fora da faixa ideal para ${parametros.cogumelo} no estágio ${parametros.estagio}`;
        severidade = 'alerta';
    }

    return { descricao, severidade };
}

// Salvar alerta
function salvarAlerta(dados_id, sensor_id, descricao) {
    const query = `
        INSERT INTO alerta (dados_id, sensor_id, descricao)
        VALUES (?, ?, ?);
    `;
    return database.executar(query, [dados_id, sensor_id, descricao]);
}

// Listar alertas
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
    return database.executar(query);
}

module.exports = {
    verificarAlertasPorSensor,
    salvarAlerta,
    listarAlertas
};
