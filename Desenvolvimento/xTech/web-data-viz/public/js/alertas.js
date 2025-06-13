
async function carregarAlertas() {
    try {
        const resposta = await fetch('http://localhost:3330/alerta');

        if (resposta.status === 200) {
            const alertas = await resposta.json();
            const container = document.querySelector('.alertas .geral .container');
            container.innerHTML = '';

            // Resetar todos os cards para verde
            const todosOsCards = document.querySelectorAll('.card1');
            todosOsCards.forEach(card => {
                card.classList.remove('status-vermelho', 'status-amarelo');
                card.classList.add('status-verde');
                card.querySelector('img').src = 'img/verde.png';
            });

            let totalCritico = 0;
            let totalAlerta = 0;

            alertas.forEach(alerta => {
                const card = document.createElement('div');

                let classeAlerta = 'cards_alerta';
                let cardStatus = 'status-amarelo';
                let imagemAlerta = 'img/amarelo.png';
                let textoExplicativo = '';

                if (alerta.descricao.toLowerCase().includes('crítica') || alerta.descricao.toLowerCase().includes('crítico')) {
                    classeAlerta = 'cards_alerta_critico';
                    cardStatus = 'status-vermelho';
                    imagemAlerta = 'img/red.png';
                    totalCritico++;

                    textoExplicativo = `
                        <ul>
                            <li>Temperaturas altas inibem o crescimento do micélio.</li>
                            <li>Umidade alta (>95%) causa proliferação de mofos.</li>
                            <li>Possível apodrecimento das bases dos cogumelos.</li>
                            <li>Favorecem contaminações bacterianas e fúngicas no substrato.</li>
                        </ul>
                    `;
                } else {
                    totalAlerta++;

                    textoExplicativo = `
                        <ul>
                            <li>Temperaturas baixas (<15°C) nas fases iniciais.</li>
                            <li>Ralentam a colonização do substrato.</li>
                            <li>Atrasam ou bloqueiam a indução da frutificação.</li>
                            <li>Umidade baixa (<70% na incubação, <85% na frutificação) seca o substrato.</li>
                            <li>Cogumelos pequenos, tortos ou com crescimento interrompido.</li>
                        </ul>
                    `;
                }

                card.classList.add(classeAlerta);

                card.innerHTML = `
                    <p><strong>${alerta.cogumelo} - ${alerta.estufa}</strong></p>
                    <p>${alerta.descricao}</p>
                    ${textoExplicativo}
                    <p><small>Sensor: ${alerta.sensor} | ${new Date(alerta.data_alerta).toLocaleString()}</small></p>
                    <a href="dashboard.html"><button class="conferir">Conferir</button></a>
                `;

                container.appendChild(card);

                // Atualizar card de estufa na dashboard
                const nomeEstufa = alerta.estufa.trim();
                const cardEstufa = [...todosOsCards].find(card => card.querySelector('h3').innerText.trim() === nomeEstufa);

                if (cardEstufa) {
                    cardEstufa.classList.remove('status-verde', 'status-amarelo', 'status-vermelho');
                    cardEstufa.classList.add(cardStatus);
                    cardEstufa.querySelector('img').src = imagemAlerta;
                }
            });

            // Atualizar KPI
            document.getElementById('kpiCritico').innerText = `${totalCritico} estufa(s) crítica(s)`;
            document.getElementById('kpiAlerta').innerText = `${totalAlerta} estufa(s) em alerta`;

            if (alertas.length === 0) {
                container.innerHTML = '<p>Nenhuma estufa em alerta.</p>';
                document.getElementById('kpiCritico').innerText = '0 estufa(s) crítica(s)';
                document.getElementById('kpiAlerta').innerText = '0 estufa(s) em alerta';
            }
        }
    } catch (erro) {
        console.error('Erro ao carregar alertas', erro);
    }
}

// Atualiza os alertas a cada 5 segundos
setInterval(carregarAlertas, 5000);
carregarAlertas();
