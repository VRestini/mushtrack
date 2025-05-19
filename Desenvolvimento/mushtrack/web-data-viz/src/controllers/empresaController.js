var empresaModel = require("../models/empresaModel")
function autenticar(req, res){
    var email= req.body.emailServer
    var senha = req.body.senhaServer
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    }else{
        empresaModel.logar(email, senha)
            .then(function(response){
                if (response.length == 1) {
                    res.json({
                        email: response[0].emailEmpresa,
                        nome: response[0].nomeEmpresa 
                    });
                } else if (response.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com mesmo login e senha!");
                }
            })
    }
}
function cadastrar(req, res) {   
    var nomeEmpresa = req.body.nomeEmpresaServer
    var email= req.body.emailServer
    var senha = req.body.senhaServer
    var cnpj = req.body.cnpjServer
    var nomeRepresentante = req.body.nomeRepresentanteServer
    if (nomeEmpresa == undefined) {
        res.status(400).send("nomeEmpresa = undefined!");
    } else if (email == undefined) {
        res.status(400).send("email = undefined!");
    } else if (senha == undefined) {
        res.status(400).send("senha = undefined!");
    } else {
        empresaModel.registrar(email, senha, cnpj, nomeEmpresa, nomeRepresentante)
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
module.exports = {
    autenticar,
    cadastrar
}