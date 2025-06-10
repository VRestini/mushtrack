var estufaModel = require("../models/estufaModel")
function buscarEstufas(req,res){
    let id_empresa = req.body.IdEmpresaServer
    let nome_cogumelo = req.body.CogumeloServer
    if(id_empresa == undefined)
        res.status(400).send("IdEmpresaServer undefined!");
    else if(nome_cogumelo == undefined)
        res.status(400).send("CogumeloServer undefined!");
    else{
        estufaModel.buscarEstufas(id_empresa, nome_cogumelo).then(function(response){
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
