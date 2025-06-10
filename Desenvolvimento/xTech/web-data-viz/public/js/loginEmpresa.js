var tentativas = 0;

function entrar() {
    tentativas++;

    if (tentativas >= 5) {
        alert("5 tentativas! Aguarde 60 segundos.");
        button_home.innerHTML = `<a>Aguarde 60 segundos</a>`;
        setTimeout(function () {
            tentativas = 0;
            button_home.innerHTML = `<a>Entrar</a>`;
        }, 60000);
        return; // impede a execução do restante da função
    }

    var email = email_input.value;
    var senha = senha_input.value;
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (email === "" || senha === "") {
        Swal.fire("Por favor, preencha todos os campos.");

    } else if (!emailValido) {
        Swal.fire("Por favor, insira um e-mail válido.");

    } else if (senha.length < 6) {
        Swal.fire("A senha deve conter pelo menos 6 caracteres.");

    } else {
        console.log("FORM LOGIN: ", email);
        console.log("FORM SENHA: ", senha);
        console.log("Enviando para o servidor:", {
            emailServer: email,
            senhaServer: senha
        });

        fetch("/empresa/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.EMAIL_EMPRESA = json.email;
                    sessionStorage.NOME_EMPRESA = json.nome;
                    setTimeout(function () {
                        window.location = "./dashtrack/home.html";
                    }, 1000);
                });
            } else {
                Swal.fire({
                    title: "Email e/ou senha inválido(s) ou usuário inativo.",
                    text: "Clique no botão!",
                    icon: "error"
                });
            }
        }).catch(function (erro) {
            console.log("Erro na requisição:", erro);
        });
    }
}