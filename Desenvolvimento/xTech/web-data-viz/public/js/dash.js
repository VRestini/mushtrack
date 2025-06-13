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
    verificarStatusEstufa(dados);
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
function verificarStatusEstufa(dados) {

    const ultimoDado = dados[dados.length - 1];
    const tempAtual = ultimoDado.temperatura;
    const umiAtual = ultimoDado.umidade;
    

    const tempMin = parseFloat(sessionStorage.TEMP_MINIMA);
    const tempMax = parseFloat(sessionStorage.TEMP_MAXIMA);
    const umiMin = parseFloat(sessionStorage.UMI_MINIMA);
    const umiMax = parseFloat(sessionStorage.UMI_MAXIMA);
    

    const statusElement = document.getElementById('status_estufa');
    const imgStatus = document.querySelector('.card1 img');
    const tempoElement = document.querySelector('.card1:nth-child(3) h3')
    const margemTemp = 1.5;
    const margemUmi = 5;
    

    if (tempAtual < (tempMin - margemTemp) || tempAtual > (tempMax + margemTemp) ||
        umiAtual < (umiMin - margemUmi) || umiAtual > (umiMax + margemUmi)) {
        statusElement.textContent = 'Crítico';
        statusElement.style.color = '#FF0000';
        imgStatus.src = "img/red.png";
        const tempoAtual = parseInt(sessionStorage.tempoCritico || 0);
        sessionStorage.tempoCritico = tempoAtual + 1;
        tempoElement.textContent = `${sessionStorage.tempoCritico}m`;
    } else if (tempAtual < tempMin || tempAtual > tempMax ||
               umiAtual < umiMin || umiAtual > umiMax) {
  
        statusElement.textContent = 'Alerta';
        statusElement.style.color = '#FFA500';
        imgStatus.src = "img/yellow.png";
        const tempoAtual = parseInt(sessionStorage.tempoCritico || 0);
        sessionStorage.tempoCritico = tempoAtual + 1;
        tempoElement.textContent = `${sessionStorage.tempoCritico}m`;
    } else {
        // Estado OK
        statusElement.textContent = 'OK';
        statusElement.style.color = '#00FF00';
        imgStatus.src = "img/green.png"; 
    }
}
function mostrarHistorico() {

    fetch("/dados/buscar-dados-historico", {  
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdEstufaServer: sessionStorage.ID_ESTUFA
        })
    }).then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao buscar histórico');
    }).then(function(response) {
   
        const historicoContainer = document.querySelector('.historico-dados');
        historicoContainer.innerHTML = '';
        
        response.forEach(item => {
            const historicoItem = document.createElement('div');
            historicoItem.className = 'historico-item';
            
            const dataHora = new Date(item.data_captura).toLocaleString();
            
            historicoItem.innerHTML = `
                <span>${dataHora}</span>
                <div>
                    <span class="valor">Temp: ${item.temperatura}°C</span>
                    <span class="valor" style="margin-left: 15px;">Umi: ${item.umidade}%</span>
                </div>
            `;
            
            historicoContainer.appendChild(historicoItem);
        });
     
        document.getElementById('popupHistorico').style.display = 'flex';
    }).catch(function(error) {
        console.error('Erro:', error);
        alert('Não foi possível carregar o histórico');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.close-popup').addEventListener('click', function() {
        document.getElementById('popupHistorico').style.display = 'none';
    });
    
});
if (!sessionStorage.tempoCritico) {
    sessionStorage.tempoCritico = 0;
}

setInterval(() => {
    const tempoElement = document.querySelector('.card1:nth-child(3) h3');
    tempoElement.textContent = `${sessionStorage.tempoCritico}m`;
}, 600);