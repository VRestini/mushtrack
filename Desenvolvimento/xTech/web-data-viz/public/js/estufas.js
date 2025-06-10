window.onload = function () {
    buscarTodasEstufas()
}
var listaEstufas = []
function buscarTodasEstufas() {
    id_empresa = sessionStorage.ID_EMPRESA
    fetch("/estufa/buscar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdEmpresaServer: id_empresa
        })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    listaEstufas.push(response[i])
                    bloco_cards.innerHTML += `<a href="dashboard.html">
              <div class="card1">
                <img src="img/verde.png" alt="Alerta">
                <h3>Estufa ${i+1}</h3>
                <p>Shimeji</p>
              </div>
            </a>`
                }
            })
        }
    })
}