var sensorModel = require("../models/sensorModel");

function cadastrar(req, res) {
    var tipo = req.body.tipoServer;
    var nome = req.body.nomeServer;
    var status = req.body.statusServer;
    var numeroSeries = req.body.numeroSeriesServer;
    var dtManutencao = req.body.dtManutencaoServer;
    var dtInstalacao = req.body.dtInstalacaoServer;
    var posicao = req.body.posicaoServer;
    var id_estufa = req.body.IdEstufaServer;

    if (tipo == undefined) {
        res.status(400).send("tipo = undefined!");
    } else if (nome == undefined) {
        res.status(400).send("nome = undefined!");
    } else if (status == undefined) {
        res.status(400).send("status = undefined!");
    } else if (numeroSeries == undefined) {
        res.status(400).send("numero de séries = undefined!");
    } else if (dtManutencao == undefined) {
        res.status(400).send("data de manutenção = undefined!");
    } else if (dtInstalacao == undefined) {
        res.status(400).send("data de instalação = undefined!");
    } else if (posicao == undefined) {
        res.status(400).send("Posição do sensor = undefined!");
    } else if (id_estufa == undefined) {
        res.status(400).send("ID da estufa = undefined!");
    } else {
        sensorModel.cadastrar(tipo, nome, status, numeroSeries, dtManutencao, dtInstalacao, posicao, id_estufa)
            .then(
                function (result) {
                    res.json(result);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function listarPorEmpresa(req, res) {
    var id_empresa = req.body.idEmpresaServer;

    if (id_empresa == undefined) {
        res.status(400).send("ID da empresa = undefined!");
    } else {
        sensorModel.listarPorEmpresa(id_empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao listar os sensores! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
module.exports = {
    cadastrar,
    listarPorEmpresa
};