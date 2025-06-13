var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");
router.post("/buscar", function (req, res) {
    estufaController.buscarEstufas(req, res);
});
router.post("/cadastrar", function (req, res) {
    estufaController.cadastrarEstufas(req, res);
});

module.exports = router;