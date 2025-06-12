const dadosModel = require('../models/dadosModel');
const alertaModel = require('../models/alertaModel');
function buscarDados(req, res) {
  let id_estufa = req.body.IdEstufaServer
  if (id_estufa == undefined)
    res.status(400).send("IdEmpresaServer undefined!");
  else {
    dadosModel.buscarUmidadeTemperatura(id_estufa).then(function (response) {
      console.log(`\nResultados encontrados: ${response.length}`)
      console.log(`Resultados: ${JSON.stringify(response)}`)
      if (response.length >= 1)
        res.json(response)
      else {
        res.status(204).send("Nenhum resultado encontrado")
      }
    })
  }
}


function buscarDadosHistorico(req, res) {
  let id_sensor = req.body.IdSensorServer
  if (id_empresa == undefined)
    res.status(400).send("IdEmpresaServer undefined!");
  else {
    dadosModel.buscarUmidadeTemperaturaHistorico(id_sensor).then(function (response) {
      console.log(`\nResultados encontrados: ${response.length}`)
      console.log(`Resultados: ${JSON.stringify(response)}`)
      if (response.length >= 1)
        res.json(response)
      else {
        res.status(204).send("Nenhum resultado encontrado")
      }
    })
  }
}
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
  inserir,
  buscarDados,
  buscarDadosHistorico
};
