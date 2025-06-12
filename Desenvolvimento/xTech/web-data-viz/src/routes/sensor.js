var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.post("/cadastrar", function (req, res) {
    sensorController.cadastrar(req, res);
})


module.exports = router;