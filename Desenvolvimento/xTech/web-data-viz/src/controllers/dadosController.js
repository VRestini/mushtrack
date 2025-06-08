const dadosModel = require('../models/dadosModel');
const alertaModel = require('../models/alertaModel');

async function inserir(req, res) {
  try {
    const { sensor_id, temperatura, umidade } = req.body;

    // Verifica se todos os campos foram fornecidos
    if (!sensor_id || temperatura === undefined || umidade === undefined) {
      return res.status(400).json({ mensagem: "Campos obrigatórios: sensor_id, temperatura, umidade" });
    }

    // Salva o novo dado
    const [resultado] = await dadosModel.inserir(sensor_id, temperatura, umidade);
    const dadosId = resultado.insertId;

    // Verifica se deve gerar um alerta
    const alerta = await alertaModel.verificarAlertasPorSensor(sensor_id, temperatura, umidade);

    if (alerta && alerta.descricao) {
      await alertaModel.salvarAlerta(dadosId, sensor_id, alerta.descricao);
    }

    return res.status(201).json({
      mensagem: "Dado registrado com sucesso",
      dados_id: dadosId,
      alerta_gerado: alerta?.descricao || null
    });

  } catch (erro) {
    console.error("Erro ao inserir dado:", erro);
    return res.status(500).json({ mensagem: "Erro interno ao registrar o dado." });
  }
}

module.exports = { 
    inserir 
};
