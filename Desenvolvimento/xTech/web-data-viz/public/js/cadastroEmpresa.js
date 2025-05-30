function cadastrar() {
    var cnpj = input_cnpj.value;
    var nomeEmpresa = input_nomeEmpresa.value;
    var nomeRepresentante = input_nomeRepresentante.value;
    var email = input_email.value;
    var senha = input_senha.value;
    var confirmarSenha = input_confirmeSenha.value;


    if (email == "" || senha == "") {
      alert("Por favor, preencha todos os campos!");
    } else if (email.indexOf("@") == -1) { //Se dentro do email ele passar pelos caracteres e não achar arroba ele retorna -1 que é porque não existe no e-mail. 
      alert("O e-mail precisa conter '@'.");
    } else if (senha.length < 6) { //o length conta a quantidade de caracteres que tem na palavra e se for menor que 6 ele devolve essa mensagem abaixo 
      alert("A senha deve conter pelo menos 6 caracteres.");
    } else if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
    } else {
      fetch("/empresa/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          nomeEmpresaServer: nomeEmpresa,
          emailServer: email,
          senhaServer: senha,
          cnpjServer: cnpj,
          nomeRepresentanteServer: nomeRepresentante
        }),
      }).then(function (resposta) {
        if (resposta.ok){
          window.location.href = "./loginEmpresa.html";
          alert("Cadastro efetuado com sucesso!");
        }
          
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    }


  }