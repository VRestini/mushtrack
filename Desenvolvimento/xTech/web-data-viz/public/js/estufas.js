
var listaEstufas = []
function buscarTodasEstufas(cogumelo) {
    id_empresa = sessionStorage.ID_EMPRESA
    let teste = cogumelo
    fetch("/estufa/buscar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdEmpresaServer: id_empresa,
            CogumeloServer: teste
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