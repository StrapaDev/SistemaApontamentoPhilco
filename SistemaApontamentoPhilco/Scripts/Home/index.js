$(document).ready(function () {
    $("#numeroSerie").focus();
});

function capturaTeclaEnterProximoCampo(e) {
    if (e.keyCode == 13) {
        if ($("#numeroSerie").val() != "") {
            $("#sequencial").focus();
            return false;
        }
    }
}

function capturaTeclaEnterFinaliza(e) {
    if (e.keyCode == 13) {
        if ($("#numeroSerie").val() != "" && $("#sequencial").val() != "") {
            salvar($("#numeroSerie").val(), $("#sequencial").val());
            return false;
        }
    }
}

function salvar(numeroSerie, sequencial) {
    $(".carregando").show();
    $.ajax({
        type: "GET",
        url: "/Home/Salvar",
        data: {
            numeroSerie: numeroSerie,
            sequencial: sequencial
        },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.erro) {
                $("#msg").html(result.msg);
                $("#divMsg").removeClass("hide");
                $("#divMsg").addClass("show");
            }
            else {
                $("#msg").html("");
                $("#divMsg").removeClass("show");
                $("#divMsg").addClass("hide");
            }
            $("#sequencial").val("");
            $("#numeroSerie").val("");
            $("#numeroSerie").focus();

            $(".carregando").hide();
        }
    });
}
