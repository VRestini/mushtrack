const express = require('express');
const router = express.Router();

const alertaController = require('../controllers/alertaController');

// Rota GET correta para listar alertas
router.get('/', alertaController.listar);

module.exports = router;
