 //leitor de QRCode
function scan()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                    navigator.notification.confirm(
                        'Deseja confirmar sua presença?',
                         onConfirm,
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

function alertConfirmed() {
    navigator.app.exitApp();
}

function onConfirm(buttonIndex) {
    if(buttonIndex == 1) {
        navigator.notification.alert(
            'Registro de presença cancelado!',
            null,
            'Falha na confirmação da presença',
            'OK'
        );
    }
    if(buttonIndex == 2) {
        navigator.notification.alert(
            'Sua presença foi confirmada com sucesso',
            alertConfirmed,
            'Presença confirmada',
            'OK'
        );
    }
}