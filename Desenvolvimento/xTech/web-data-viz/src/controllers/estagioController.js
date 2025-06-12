var estagioModel = require("../models/estagioModel")
function buscarEstagio(req,res){
    let id_estufa = req.body.IdEstufaServer
    if(id_estufa == undefined)
        res.status(400).send("IdEstufaServer undefined!");
    else{
        estagioModel.buscarParametro(id_estufa).then(function(response){
            if(response.length>=1)
                res.json(response)
            else{
                res.status(204).send("Nenhum resultado encontrado")
            }
        })
    }
}
module.exports = {
    buscarEstagio
};
