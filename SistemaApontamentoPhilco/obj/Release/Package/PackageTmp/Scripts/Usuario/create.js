$(document).ready(function () {
    var frmUsuario = $('#frmUsuario');
    var error2 = $('.alert-danger', frmUsuario);
    var success2 = $('.alert-success', frmUsuario);

    frmUsuario.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: {
            Nome: {
                required: "Nome é Obrigatório"
            },
            Login: {
                required: "Login é Obrigatório",
            },
            PerfilId: {
                required: "Perfil é Obrigatório"
            }
        },
        rules: {
            Nome: {
                required: true
            },
            Login: {
                required: true
            },
            PerfilId: {
                required: true
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            success2.hide();
            error2.show();
            App.scrollTo(error2, -200);
        },
        errorPlacement: function (error, element) { // render error placement for each input type
            var icon = $(element).parent('.input-icon').children('i');
            icon.removeClass('fa-check').addClass("fa-warning");
            icon.attr("data-original-title", error.text()).tooltip({ 'container': 'body' });
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group   
        },
        unhighlight: function (element) { // revert the change done by hightlight
        },
        success: function (label, element) {
            var icon = $(element).parent('.input-icon').children('i');
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
            icon.removeClass("fa-warning").addClass("fa-check");
        },
        submitHandler: function (form) {
            success2.show();
            error2.hide();
            $(".carregando").show();
            form.submit();
        }
    });
});

function SalvarUsuario() {
    if ($("#lblSenhaIntegrada").hasClass("is-checked")) {
        $("#SenhaIntegrada").attr("checked", "checked");
    }
    else {
        $("#SenhaIntegrada").removeAttr("checked");
    }

    $("#frmUsuario").submit();
}

function CheckSenhaIntegrada() {
    if ($("#lblSenhaIntegrada").hasClass("is-checked")) {
        $("#Senha").attr("readonly", false);
        $("#Senha").focus();
    }
    else {
        $("#Senha").attr("readonly", true);
        $("#Senha").val("");
    }
}