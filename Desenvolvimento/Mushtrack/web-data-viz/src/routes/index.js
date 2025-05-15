var express = require("express");
var router = express.Router();
const path = require("path");
router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;