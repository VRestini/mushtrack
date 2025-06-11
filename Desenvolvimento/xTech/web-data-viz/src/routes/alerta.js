// Arquivo: routes/alertas.js

const express = require('express');
const router = express.Router();
const conexao = require('../database/conexao');

// Listar todos os alertas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM alerta ORDER BY id_alerta DESC';

    conexao.query(query, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar alertas:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar alertas.' });
        }

        res.status(200).json(resultados);
    });
});

module.exports = router;

