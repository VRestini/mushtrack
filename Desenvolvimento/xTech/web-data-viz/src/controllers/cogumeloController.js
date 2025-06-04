var cogumeloModel = require("../models/cogumeloModel")
function buscarCogumelo(){
    let id_empresa = req.body.IdEmpresaServer
    let id_estufa = req.body.IdEstufaServer
    if(id_empresa == undefined)
        res.status(400).send("IdEmpresaServer undefined!");
    else{
        cogumeloModel.buscarCogumelo(id_empresa, id_estufa).then(function(response){
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
    buscarCogumelo
};
