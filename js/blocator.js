$(function()
{
	
	console.log('* LOAD: Carga de jQuery');
	google.maps.event.addDomListener(window, 'load', initMap);

    // Una vez cargado el mapa, cargamos el JSON
    getAddress();

});

var map;
var geocoder;
var latlngDefault;
var zoomDefault = 13;   // Zoom por defecto.

// Establecemos coordenadas por defecto (Infinite Loop).
var lat = 37.3317389;
var lng = -122.0308209;

// Inicializamos el mapa.
function initMap()
{
	console.log('* LOAD: Inicialización del mapa');
	geocoder = new google.maps.Geocoder();

	latlngDefault = new google.maps.LatLng(lat, lng);

	// Definimos el mapa
	var mapOptions = {
		center: latlngDefault,
		disableDefaultUI: true,
		panControl: false,
		scaleControl: true,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.medium,
			position: google.maps.ControlPosition.TOP_LEFT
		},
		overViewMapControl: false,
		streetViewControl: false,
		mapTypeControlOptions: { mapTypeIds: [] },
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	// Creamos el objeto mapa
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
}


/** Función con la que cargamos el JSON y tratamos que hacer con las coordenadas. */
function getAddress()
{
    console.log('* LOAD: Se procesa el fichero blocator.json');

    $.get('blocator.json', function(locator) {
        var address = locator.address;
        var latlng = locator.location;
        var zoom = locator.zoom;

        console.log('* LOAD: Procesamos las variables');

        if (zoom == null) {
            zoom = zoomDefault;
        }

        // Aplicamos el zoom indicado en el fichero.
        map.setZoom(zoom);

        // El orden de prioridad será coordenadas, y luego dirección.
        if (latlng != null) {
            console.log('* LOAD: Procesamos longitud y latitud.');
            latlng = new google.maps.LatLng(latlng.lat, latlng.lng);
            setMarker(latlng);
        }
        else if (address != null) {
            console.log('* LOAD: Procesamos la dirección.');
            processAddress(address);
        }
        else {
            console.log('* LOAD: Procesamos las coordenadas por defecto.');
            setMarker(latlngDefault);
        }

    })
        .fail(function(){
            // Si falló la carga, programar una ventana modal vistosa.
            console.log('** ERROR: No se pudo cargar el fichero')
        });
}


/** Función con la que procesamos la dirección recibida y calculamos sus coordenadas */
function processAddress(address)
{
    console.log('* LOAD: Empezamos a procesar la direccion');

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            setMarker(results[0].geometry.location);

        } else {
            console.log('** ERROR: No se pudo consegir la geo posición por: ' + status);
        }
    });
}


/** Función con la que establecemos la marca y centramos el mapa. */
function setMarker(latlng)
{
    // Centramos el mapa.
    map.setCenter(latlng);

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        zIndex: 9
    });
}