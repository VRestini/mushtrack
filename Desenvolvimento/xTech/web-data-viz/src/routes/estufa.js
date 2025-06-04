var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");
router.post("/buscar", function (req, res) {
    empresaController.entrar(req, res);
});
module.exports = router;