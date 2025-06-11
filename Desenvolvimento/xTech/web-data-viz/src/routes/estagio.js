var express = require("express");
var router = express.Router();

var estagioController = require("../controllers/estagioController");

router.post("/buscar", function (req, res) {
    estagioController.buscarEstagio(req, res);
})


module.exports = router