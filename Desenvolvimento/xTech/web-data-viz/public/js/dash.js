
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

