var sensorModel = require("../models/sensorModel");

function buscarTodosSensoresPorEmpresa(req, res) {
    let idEstufa = req.body.idEstufa;
    let idEmpresa = req.body.idEmpresa;
    if (idEstufa == undefined) res.status(400).send("IdEstufa = Undefined");
    else if (idEmpresa == undefined)
        res.status(400).send("IdEmpresa = Undefined");
    sensorModel.buscar(idEstufa, idEmpresa).then(function (result) {
        if (res.length >= 1)
            res.status(200).json(result);
        else
            res.status(204).send("Nenhum resultado encontrado");
    }.catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar os sensores! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    ));
}

module.exports = {
    buscarTodosSensores,
};
