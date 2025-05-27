var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})


router.post("/autenticar", function (req, res) {
    empresaController.entrar(req, res);
});

router.get("/", function (req, res) {
    empresaController.testar(req, res);
});


module.exports = router;
