var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/carregar", function (req, res) {
    sensorController.buscarTodosSensoresPorEmpresa(req, res);
})


module.exports = router;