const ref = db.ref('categorias');

$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        let nome = $("#nome").val();
        let informacoes = $("#informacoes").val();

        if (nome === "" || informacoes === "") {
            alert("Preencha todos os campos!");
            return;
        }

        ref.push({nome, informacoes});
        limpar();
    });
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Informações</th>
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
                <td>${reg.informacoes}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm deletar" data-id="${id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm editar" data-id="${id}" data-nome="${reg.nome}" data-informacoes="${reg.informacoes}">
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
        let informacoes = $(this).data("informacoes");
        
        $("#nome").val(nome);
        $("#informacoes").val(informacoes);
        $("#nome").focus();
        
        ref.child(id).remove();
    });
});

function limpar() {
    $("#nome").val("");
    $("#informacoes").val("");
    $("#nome").focus();
}