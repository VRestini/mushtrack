// Variáveis globais para os gráficos
let graficoTemperatura = null;
let graficoUmidade = null;

function buscarEstagio() {
    id_estufa = sessionStorage.ID_ESTUFA;
    fetch("/estagio/buscar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdEstufaServer: id_estufa,
        })
    }).then(function (response) {
        if (response.ok) {
            const idNome = document.getElementById('nome_estagio');
            response.json().then(function (response) {
                idNome.innerHTML = response[0].tipo;
                sessionStorage.ID_ESTAGIO = response[0].id
            });
        }
    });
}
function buscarParametrosEstufa() {
    var id_cogumelo = sessionStorage.ID_COGUMELO
        var id_estagio = sessionStorage.ID_ESTAGIO
        console.log(id_cogumelo, "aa", id_estagio)
    fetch("/parametro/buscar", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCogumeloServer: id_cogumelo,
            idEstagioServer: id_estagio
        })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (response) {
                sessionStorage.TEMP_MINIMA = response[0].temp_minima;
                sessionStorage.TEMP_MAXIMA = response[0].temp_maxima;
                sessionStorage.UMI_MINIMA = response[0].umi_minima;
                sessionStorage.UMI_MAXIMA = response[0].umi_maxima;
            });
        }
    });
}
function buscarDadosEstufa() {
    const id_estufa = sessionStorage.ID_ESTUFA;

    fetch("/dados/buscar-dados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdEstufaServer: id_estufa  
        })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (response) {
                console.log("Dados recebidos:", response);
                criarGraficos(response);
            });
        } else if (response.status === 204) {
            console.log("Nenhum dado encontrado para esta estufa");
        }
    }).catch(function (error) {
        console.error("Erro na requisição:", error);
    });
}

function criarGraficos(dados) { 
    const labels = processarDatas(dados);
    const temperaturas = dados.map(item => item.temperatura);
    const umidades = dados.map(item => item.umidade);
    if (graficoTemperatura) graficoTemperatura.destroy();
    if (graficoUmidade) graficoUmidade.destroy();
    const ctxTemp = document.getElementById('graficoTemperatura').getContext('2d');
    graficoTemperatura = new Chart(ctxTemp, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura (°C)',
                data: temperaturas,
                backgroundColor: '#4E3324',
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 35
                }
            }
        }
    });
    const ctxUmi = document.getElementById('graficoUmidade').getContext('2d');
    graficoUmidade = new Chart(ctxUmi, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Umidade (%)',
                data: umidades,
                borderColor: '#4E3324',
                tension: 0.3,
                fill: true,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 100
                }
            }
        }
    });
}

function processarDatas(dados) {

    return dados.map(item => {
        const date = new Date(item.data_captura);
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    });
}