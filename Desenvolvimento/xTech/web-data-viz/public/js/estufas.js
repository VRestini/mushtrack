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
                for (var i = 1; i < response.length; i++) {
                    listaEstufas.push(response[i])
                    bloco_cards.innerHTML += `<a href="dashboard.html" onclick = "loadDashPage(${response[i].id}, ${response[i].idCogumelo})">
              <div class="card1" id="${response[i].id}">
                <img src="img/verde.png" alt="Alerta">
                <h3>Estufa ${i+1}</h3>
                <p>${response[i].nome}</p>
              </div>
            </a>`
                }
            })
        }
    })
}
function loadDashPage(idEstufa, idCogumelo){
    sessionStorage.ID_ESTUFA = idEstufa
    sessionStorage.ID_COGUMELO = idCogumelo
    window.location = ("./estufasParis.html")
}