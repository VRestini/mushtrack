
function buscarParametro() {
    id_estufa = sessionStorage.ID_ESTUFA
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
                idNome.innerHTML = response[0].tipo
            })
        }
    })
}
    function buscarSensores(){
        id_estufa  = sessionStorage.ID_ESTUFA
        id_empresa = sessionStorage.ID_EMPRESA
        fetch("/sensor/carregar",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IdEstufaServer: id_estufa,
                IdEmpresaServer: id_empresa
            })
        }).then(function(response){
            if(response.ok){
                var listaSensores=[]
                response.json().then(function (response) {
                    for (let i = 0; i < response.length; i++) {
                        listaSensores.push(response[i].id)
                    }        
                })
                sessionStorage.ID_SENSORES = listaSensores
                
            }
        })

    }
