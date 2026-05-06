const ref = db.ref('fornecedores');

$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        let nome = $("#nome").val();
        let cnpj = $("#cnpj").val();
        let email = $("#email").val();

        if (nome === "" || email === "" || cnpj === "") {
            alert("Preencha todos os campos!");
            return;
        }

        ref.push({nome, email, cnpj});
        limpar();
    });
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>E-mail</th>
            <th colspan="2">Opções</th>
        </tr>
        `);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.email}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm deletar" data-id="${id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm editar" data-id="${id}" data-nome="${reg.nome}" data-cnpj="${reg.cnpj}" data-email="${reg.email}">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });

    $(".deletar").click(function() {
        let id = $(this).data("id");
        if (confirm("Tem certeza que deseja deletar?")) {
            ref.child(id).remove();
        }
    });

    $(".editar").click(function() {
        let id = $(this).data("id");
        let nome = $(this).data("nome");
        let cnpj = $(this).data("cnpj");
        let email = $(this).data("email");
        
        $("#nome").val(nome);
        $("#cnpj").val(cnpj);
        $("#email").val(email);
        $("#nome").focus();
        
        ref.child(id).remove();
    });
});

function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#cnpj").val("");
    $("#nome").focus();
}