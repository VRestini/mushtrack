var empresaModel = require("../models/empresaModel")


function testar(req, res) {
    console.log("ENTRAMOS NA empresaController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        empresaModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function autenticar(req, res){
    var email= req.body.emailServer
    var senha = req.body.senhaServer
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    }else{
        empresaModel.entrar(email, senha)
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

function registrar(req, res) {   
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
        empresaModel.registrar(email, cnpj, nomeEmpresa, nomeRepresentante, senha)
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
    registrar,
    entrar,
    testar
}