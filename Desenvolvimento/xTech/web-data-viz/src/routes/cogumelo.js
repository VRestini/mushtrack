var express = require("express");
var router = express.Router();
var cogumeloController = require("../controllers/cogumeloController");
router.post("/buscar", function(req,res){
    cogumeloController.buscarCogumelo(req,res)
})

module.exports = router