var sensorModel = require("../models/sensorModel");

function buscarTodosSensoresPorEstufa(req, res) {
    let idEstufa = req.body.IdEstufaServer;
    let idEmpresa = req.body.IdEmpresaServer;
    if (idEstufa == undefined)
        res.status(400).send("IdEstufa = Undefined");
    else if (idEmpresa == undefined)
        res.status(400).send("IdEmpresa = Undefined");
    else {
        sensorModel.buscar(idEstufa, idEmpresa).then(function (response) {
            console.log(`\nResultados encontrados: ${response.length}`)
            console.log(`Resultados: ${JSON.stringify(response)}`)
            if (res.length >= 1)
                res.status(200).json(result);
            else
                res.status(204).send("Nenhum resultado encontrado");
        })
    }
}

module.exports = {
    buscarTodosSensoresPorEstufa
};
