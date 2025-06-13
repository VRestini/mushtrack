var parametroModel = require("../models/parametroModel");

function buscarParametros(req, res) {
    let idCogumelo = req.body.idCogumeloServer;
    let idEstagio = req.body.idEstagioServer;
    if (idCogumelo == undefined) {
        res.status(400).send("idCogumeloServer está undefined!");
    } else if (idEstagio == undefined) {
        res.status(400).send("idEstagioServer está undefined!");
    } else {
        parametroModel.buscarParametro(idCogumelo, idEstagio)
            .then(function (response) {
                if (response.length >= 1) {
                    res.json(response);
                } else {
                    res.status(204).send("Nenhum parâmetro encontrado para os critérios informados");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os parâmetros! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarParametros
};