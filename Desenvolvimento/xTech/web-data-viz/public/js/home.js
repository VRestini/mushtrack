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
                    /*conteudo_cogumelos_container.innerHTML += `<div class="Cogumelo">
              <a href="estufas.html">
                <div class="conteudo">
                  <h2>Shimeji</h2>
                  <img src="img/shimeji_card.png" alt="Shimeji">
                </div>
              </a>
            </div>`*/
                }
            })
        }
    })
}