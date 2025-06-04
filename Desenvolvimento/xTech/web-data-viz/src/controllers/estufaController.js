var estufaModel = require("../models/estufaModel")
function buscarEstufas(){
    let id_empresa = req.body.IdEmpresaServer
    if(id_empresa == undefined)
        res.status(400).send("IdEmpresaServer undefined!");
    else{
        estufaModel.buscarEstufas(id_empresa).then(function(response){
            console.log(`\nResultados encontrados: ${response.length}`)
            console.log(`Resultados: ${JSON.stringify(response)}`)
            if(response.length>=1)
                res.json(response)
            else{
                res.status(204).send("Nenhum resultado encontrado")
            }
        })
    }
}module.exports = {
    buscarEstufas
};
