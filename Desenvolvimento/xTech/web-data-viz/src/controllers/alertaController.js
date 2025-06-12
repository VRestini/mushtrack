const alertaModel = require('../models/alertaModel');

async function listar(req, res) {
  try {
    const resultado = await alertaModel.listarAlertas();

    if (resultado.length === 0) {
      return res.status(204).send(); 
    }

    return res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao listar alertas:", erro);
    return res.status(500).json({ mensagem: "Erro ao buscar alertas." });
  }
}

module.exports = {
  listar
};
