// 📦 carregar dados
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// 🚀 quando abrir qualquer página
window.onload = function () {
    carregarTabela();
    carregarAgenda();
};

// ➕ cadastrar
function cadastrarCliente() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;

    if (!nome || !email || !telefone) {
        alert("Preencha todos os campos!");
        return;
    }

    let cliente = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    clientes.push(cliente);

    localStorage.setItem("clientes", JSON.stringify(clientes));

    carregarTabela();

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
}

// 📊 tabela (cadastro)
function carregarTabela() {
    let tabela = document.getElementById("tabelaClientes");

    if (!tabela) return;

    tabela.innerHTML = "";

    clientes.forEach(cliente => {
        let linha = tabela.insertRow();

        linha.insertCell(0).innerHTML = cliente.nome;
        linha.insertCell(1).innerHTML = cliente.email;
        linha.insertCell(2).innerHTML = cliente.telefone;
    });
}

// 📅 agenda
function carregarAgenda() {
    let lista = document.getElementById("listaAgenda");

    if (!lista) return;

    lista.innerHTML = "";

    // 🔤 ordenar alfabeticamente
    clientes.sort((a, b) => 
        a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
    );

    clientes.forEach((cliente, index) => {
        let linha = lista.insertRow();

        linha.insertCell(0).innerHTML = cliente.nome;
        linha.insertCell(1).innerHTML = cliente.telefone;
        linha.insertCell(2).innerHTML = cliente.email;

        let colunaObs = linha.insertCell(3);

        colunaObs.innerHTML = `
            <input type="text" id="obs_${index}" 
            value="${cliente.observacao || ""}" 
            placeholder="Digite...">

            <button onclick="salvarObs(${index})">
                Salvar
            </button>
        `;
    });
}

// 💾 salvar observação
function salvarObs(index) {
    let input = document.getElementById(`obs_${index}`);
    let valor = input.value;

    clientes[index].observacao = valor;

    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert("Observação salva!");
}

// 🔙 voltar
function voltar() {
    window.location.href = "menu.html";
}