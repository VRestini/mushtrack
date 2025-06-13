// Arquivo: routes/dados.js
const express = require('express');
const router = express.Router();

var dadosController = require("../controllers/dadosController");

const conexao = require('../database/conexao');
// Exemplo de limites
const temperaturaLimite = { min: 10, max: 30 }; // exemplo
const umidadeLimite = { min: 60, max: 85 }; // exemplo

router.post('/', (req, res) => {
    const { temperatura, umidade, data_hora } = req.body;

    if (temperatura === undefined || umidade === undefined || !data_hora) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    // Insere os dados na tabela 'dados'
    const queryInserirDados = 'INSERT INTO dados (temperatura, umidade, data_hora) VALUES (?, ?, ?)';
    const valores = [temperatura, umidade, data_hora];

    conexao.query(queryInserirDados, valores, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao inserir dados:', erro);
            return res.status(500).json({ erro: 'Erro ao inserir dados.' });
        }

        // Verificação de temperatura
        if (temperatura < temperaturaLimite.min || temperatura > temperaturaLimite.max) {
            const mensagemTemp = `Temperatura fora do ideal: ${temperatura}°C`;
            gerarAlerta('Temperatura', mensagemTemp, 'Alto');
        }

        // Verificação de umidade
        if (umidade < umidadeLimite.min || umidade > umidadeLimite.max) {
            const mensagemUmi = `Umidade fora do ideal: ${umidade}%`;
            gerarAlerta('Umidade', mensagemUmi, 'Alto');
        }

        res.status(201).json({ mensagem: 'Dados inseridos com sucesso.' });
    });
});

// Função que gera alerta automaticamente
function gerarAlerta(tipo_alerta, mensagem, nivel_alerta) {
    const queryAlerta = 'INSERT INTO alerta (tipo_alerta, mensagem, nivel_alerta) VALUES (?, ?, ?)';
    const valoresAlerta = [tipo_alerta, mensagem, nivel_alerta];

    conexao.query(queryAlerta, valoresAlerta, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao gerar alerta:', erro);
        } else {
            console.log('Alerta registrado:', mensagem);
        }
    });
}
    
router.post("/buscar-dados", function (req, res) {
    dadosController.buscarDados(req, res);
});

router.post("/buscar-dados-historico", function (req, res) {
    dadosController.buscarDadosHistorico(req, res);
});

module.exports = router;
