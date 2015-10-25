 //leitor de QRCode
function scan()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                    //alert(result.text);
                    navigator.notification.confirm(
                        'Deseja confirmar sua presença?',
                        function(buttonIndex){
                             onConfirm(buttonIndex, result.text);
                        },
                        'Confirmação',
                        ['Cancelar', 'Confirmar']
                    );
                }
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
   );
}

function closeApp() {
    navigator.app.exitApp();
}

function alertFail(mensagem){
    navigator.notification.alert(
        mensagem,
        closeApp,
        'Falha na confirmação [ Dados inválidos ]',
        'OK'
    );
}

function alertCancel(){
    navigator.notification.alert(
        'Registro de presença cancelado!',
        null,
        'Falha na confirmação da presença',
        'OK'
    );
}

function alertSuccess(mensagem){
    navigator.notification.alert(
       mensagem,
       closeApp,
       'Presença confirmada',
       'OK'
    );
}

function onConfirm(buttonIndex, params) {

    if(buttonIndex == 1) {
        alertCancel();
    }
    if(buttonIndex == 2) {
        //pega os dados do QRCode para fazer requisicao de registro da presenca
        //chave armazenada
        var chave;
        if(localStorage.getItem("Key")) {
            chave = localStorage.getItem("Key");
        }
        if(!chave) {
            alertFail('Não foi possível confirmar sua presença.');
        }
        else {
            var param = params.split(';');
            var turma = param[0].split('=');
            var disciplina = param[1].split('=');

            $.post('http://192.168.0.102/setarPresenca.php',
                { chave: chave, turmaId: turma[1], disciplinaId: disciplina[1] },
                function (responseData) {
                    var response = $.parseJSON(responseData);
                    //var response = responseData;

                    if(response.sucesso == true) {
                        alertSuccess(response.descricao);
                    }
                    else {
                        alertFail(response.descricao);
                    }
            });
        }
    }
}