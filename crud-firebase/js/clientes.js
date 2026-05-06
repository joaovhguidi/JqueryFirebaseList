const ref = db.ref("clientes");

$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();

    if (nome === "" || email === "") {
        alert('Preencha todos os campos');
        return;
    }

    ref.push({ nome, email });
    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
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
                <td>${reg.email}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm deletar" data-id="${id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm editar" data-id="${id}" data-nome="${reg.nome}" data-email="${reg.email}">
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
        let email = $(this).data("email");
        
        $("#nome").val(nome);
        $("#email").val(email);
        $("#nome").focus();
        
        ref.child(id).remove();
    });
});

function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#nome").focus();
}