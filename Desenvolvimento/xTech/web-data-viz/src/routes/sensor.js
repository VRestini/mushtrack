var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.post("/carregar", function (req, res) {
    sensorController.buscarTodosSensoresPorEstufa(req, res);
})


module.exports = router;