const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

router.get('/', alertaController.listar);

module.exports = router;
