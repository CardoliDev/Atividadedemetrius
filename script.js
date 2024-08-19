const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// Alterna a visibilidade da barra lateral
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Remove a classe 'close' ao clicar no botão de busca
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

// Alterna entre modos claro e escuro
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    modeText.innerText = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// Manipulação do formulário de criação de personagem RPG
document.getElementById('formPersonagem').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Captura os dados do formulário
    const dadosPersonagem = {
        nome: document.getElementById('nome').value,
        classe: document.getElementById('classe').value,
        raca: document.getElementById('raca').value,
        habilidades: document.getElementById('habilidades').value,
        historico: document.getElementById('historico').value,
        descricao: document.getElementById('descricao').value
    };

    // Armazena os dados no sessionStorage
    sessionStorage.setItem('dadosPersonagem', JSON.stringify(dadosPersonagem));

    // Exibe uma mensagem de sucesso
    alert('Personagem salvo com sucesso!');
});

// Função para exibir os detalhes do personagem
function exibirDetalhesPersonagem(personagem) {
    const detalhesElement = document.getElementById('personagemDetalhes');
    detalhesElement.innerHTML = `
        <h2>Detalhes do Personagem</h2>
        <p><strong>Nome:</strong> ${personagem.nome}</p>
        <p><strong>Classe:</strong> ${personagem.classe}</p>
        <p><strong>Raça:</strong> ${personagem.raca}</p>
        <p><strong>Habilidades:</strong> ${personagem.habilidades}</p>
        <p><strong>Histórico:</strong> ${personagem.historico}</p>
        <p><strong>Descrição:</strong> ${personagem.descricao}</p>
    `;
}

// Função para recuperar e mostrar os dados do personagem ao carregar a página
function mostrarPersonagem() {
    const dadosRecuperados = sessionStorage.getItem('dadosPersonagem');
    
    if (dadosRecuperados) {
        const personagem = JSON.parse(dadosRecuperados);
        exibirDetalhesPersonagem(personagem);
    } else {
        alert('Nenhum personagem disponível para mostrar.');
    }
}

// Função para enviar os dados do personagem
function enviarPersonagem() {
    const dadosRecuperados = sessionStorage.getItem('dadosPersonagem');

    if (dadosRecuperados) {
        const dados = JSON.parse(dadosRecuperados);

        // Envio da requisição usando Fetch API
        fetch('/enviar-personagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Personagem enviado com sucesso:', data);
        })
        .catch((error) => {
            console.error('Erro ao enviar personagem:', error);
        });
    } else {
        alert('Nenhum personagem disponível para enviar.');
    }
}

// Função para mostrar a requisição em formato de URL-encoded
function mostrarRequisicao() {
    const dadosRecuperados = sessionStorage.getItem('dadosPersonagem');

    if (dadosRecuperados) {
        const dados = JSON.parse(dadosRecuperados);
        const urlEncodedData = new URLSearchParams(dados);
        const contentLength = urlEncodedData.toString().length;

        alert(`Exemplo de requisição:
POST /process_form.php HTTP/1.0
HOST: www.seusite.com
Content-Type: application/x-www-form-urlencoded
Content-Length: ${contentLength}

${urlEncodedData.toString()}`);
    } else {
        alert('Nenhum personagem disponível para mostrar.');
    }
}

// Chame a função para mostrar os dados quando a página carregar
window.onload = mostrarPersonagem;



