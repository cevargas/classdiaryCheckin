//carrega maps, so vai carregar quando a pagina pagecheckin for chamada
$( document ).on( "pagebeforeshow", "#pagecheckin", function() {
    var defaultLatLng = new google.maps.LatLng(-28.265042, -52.396775); //Imed

    //distancia ate a imed
    var imed = defaultLatLng
    var pf = new google.maps.LatLng(-28.2611628, -52.4083349); //Passo Fundo
    console.log(calcDistance(imed, pf));
    function calcDistance(imed, pf) {
      return (google.maps.geometry.spherical.computeDistanceBetween(imed, pf) / 1000).toFixed(2);
    }

    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //chama scan do QRCode
            scan();
        }
        function fail(error) {
            //console.log(error)
            //drawMap(defaultLatLng);  // Failed to find location, show default map
            $.mobile.navigate( "#invalidLocation", { transition : "slide" });
        }

        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});

    } else {
        //drawMap(defaultLatLng);  // No geolocation support, show default map
        $.mobile.navigate( "#invalidLocation", { transition : "slide" });
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Sucesso!"
        });
    }
});