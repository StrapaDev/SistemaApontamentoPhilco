$(document).ready(function () {
    Pesquisar();

    $("#btnPesquisar").click(function () { Pesquisar(); });
});

function Pesquisar() {
    $(".carregando").show();
    $.ajax({
        type: "GET",
        url: "/Usuario/Pesquisar",
        data: {
            nome: $('#nome').val(),
            login: $('#login').val(),
            perfilId: $('#perfilId').val()
        },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#grid").html(result);
            $(".carregando").hide();
        }
    });
}

function Excluir(id) {
    swal({
        title: 'Atenção',
        text: "Deseja realmente excluir este registro?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then(function (result) {
        if (result.value === true) {
            $.ajax({
                type: "GET",
                url: "/Usuario/Excluir",
                data: {
                    id: id
                },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    Pesquisar();
                }
            });
        }
    });
}