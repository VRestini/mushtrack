var express = require("express");
var router = express.Router();

var parametroController = require("../controllers/parametroController");
router.post("/buscar", function (req, res) {
    parametroController.buscarParametros(req, res);
});

module.exports = router;