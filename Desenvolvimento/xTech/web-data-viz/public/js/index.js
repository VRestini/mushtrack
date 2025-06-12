var estufa = 0;
    function analisar() {
        
        var kgProducao = Number(input_prod.value)
        var estagio = select_estagio.value
        var cogumelo = select_cogumelo.value
        var precoKg = Number(input_preco.value)
        var temp = Number(input_temp.value)
        var umid = Number(input_umid.value)
        var mensagem = ""
        if(cogumelo == "#"){
            mensagem = "Erro! Escolha um cogumelo para prosseguir."
            alert(mensagem)
        }else if(estagio == "#"){
            mensagem = "Erro! Escolha um estágio para prosseguir."
            alert(mensagem)
        }else if (kgProducao <= 0){
            mensagem = "Erro! Insira uma produção da estufa válida (maior que 0)  para prosseguir."
            alert(mensagem)  
        }
        else if(temp < 0){
            mensagem = "Erro! A temperatura média está abaixo de zero. "
            alert(mensagem)
        }
        else if(umid < 0){
            mensagem = "Erro! A umidade do ar média está abaixo de zero. "
            alert(mensagem)
        }
        else if(umid > 100){
            mensagem = "Erro! A umidade do ar média está acima de 100%. "
            alert(mensagem)
        }
        else if(temp == ""){
          mensagem = "Erro! Insira um valor de temperatura para prosseguir"
          alert(mensagem)
        }
        else if(umid == ""){
          mensagem = "Erro! Insira um valor de umidade para prosseguir"
          alert(mensagem)
        }
        else if(precoKg == 0){
            mensagem = "Erro! Insira um preço do quilo válido (maior que 0) para prosseguir."
            alert(mensagem)
        }
        else{
            var flush = 0
            var rendiemnto = kgProducao * precoKg
            var rendiemntoControlado = rendiemnto * 1.044
            var tempMin = 0
            var tempMax = 0
            var umiMin = 0
            var umiMax = 0
            var flush = 0
            if(cogumelo == "Champignon"){
                    flush = 6
                    tempMax = 26
                    tempMin = 22
                    umiMax = 95
                    umiMin = 85
                if(estagio == "Incucabação"){            
                    umiMax = 100
                    umiMin = 90
                }else if(estagio == "Indução"){
                    umiMax=95
                    umiMin=85
                    tempmin = 20
                }
            }else if(cogumelo == "Shimeji"){
                flush = 3
                tempMax = 15
                tempMin = 10
                umiMax = 100
                umiMin = 95
                if(estagio == "Frutificação"){
                    umiMax = 95
                    umiMin = 90
                }else if(estagio == "Incubação"){
                    tempMax = 26
                    tempMin = 22

                }
            }else{
                flush = 5
                tempMax = 17
                tempMin = 14
                umiMax = 95
                umiMin = 85
                if(estagio == "Incubação"){
                    tempMax = 28
                    tempMin = 24
                    umiMax = 90
                }
            }
            var status = ""
            if(temp >= tempMin && temp <= tempMax){
                status = "Ideal para produção"        
            }else{
                status = "Possível prejuízo"
                flush--
            }
            if(status == "Ideal para produção"){
             
              mensagem += `
              <div id="simulator_container_text_result">
                <h3 id = "simulator_text_estufa"> Estufa de ${cogumelo}:</h3>
                <p class = "simulator_text_result">STATUS: ${status} </p>
                <p class = "simulator_text_result" >TEMPERATURA: ${tempMin}°C A ${tempMax}°C</p>
                <p class ="simulator_text_result" >UMIDADE: ${umiMin}% A ${umiMax}% </p>
                <p class = "simulator_text_result">FLUSHS: Até ${flush}</p> 
                <p class = "simulator_text_result">PRODUÇÃO: R$:${rendiemnto.toFixed(2)} </p>
                <p class = "simulator_text_result">PRODUÇÃO TOTAL: R$:${(rendiemnto * flush).toFixed(2)}</p>
              </div>`
                
            }else{                            
              mensagem += `
              <div id="simulator_container_text_result">
                <h1>Estufa de ${cogumelo}:</h1>
                <p class="simulator_text_result_prejuízo">STATUS: ${status} </p>
                <p class="simulator_text_result">TEMPERATURA IDEAL: ${tempMin}°C A ${tempMax}°C</p>
                <p class="simulator_text_result">UMIDADE IDEAL: ${umiMin}% A ${umiMax}% </p>
                <p class="simulator_text_result">FLUSHS (Ciclos de produção): Até ${flush}</p> 
                <p class="simulator_text_result">PRODUÇÃO (Valor de 1 flush): R$:${rendiemnto.toFixed(2)} </p>
                <p class="simulator_text_result">PRODUÇÃO TOTAL (${flush} flushs): R$:${(rendiemnto * flush).toFixed(2)}</p>
                <p class="simulator_text_result_Total">ESTIMATIVA DA PRODUÇÃO TOTAL COM MUSHTRACK: R$${(rendiemntoControlado * flush).toFixed(2)}</p>
              </div>`
              
            }       
        }
        simulator_result.innerHTML = mensagem
    }