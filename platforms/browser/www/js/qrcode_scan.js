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

function onConfirm(buttonIndex) {
    if(buttonIndex == 1) {
         alert('Registro de Presença cancelado!');
    }
    if(buttonIndex == 2) {
        alert('Presença confirmada com Sucesso!');
    }
}