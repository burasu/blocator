//jQuery(document).ready(function($)
$(function()
{
    // establecemos los parametros del mapa de google por defecto.
    var latitude = 37.3317389,
        longitude = -122.0308209,
        map_zoom = 14;

    var map;
    var latlngDefault;

    var marker_url = 'img/baenne-icon-location.png';

    // definimos los colores básicos del mapa, junto a los valores de brillo y saturación.
    var	main_color = '#7BA9B6',
        saturation_value= -20,
        brightness_value= 5;

    // definimos el estilo del mapa
    var style= [
        {
            // establecemos la saturación para las etiquetas del mapa
            elementType: "labels",
            stylers: [
                {saturation: saturation_value}
            ]
        },
        {	// no mostramos los puntos de interes en el mapa (no es un mapa turístico).
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            // mostramos las autopistas en el mapa.
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {visibility: "on"}
            ]
        },
        {
            // mostramos las carreteras locales
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [
                {visibility: "on"}
            ]
        },
        {
            // mostramos las carreteras arteriales
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
                {visibility: "on"}
            ]
        },
        {
            // perfilar las carreteras
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                {visibility: "off"}
            ]
        },
        // estilo para diferentes elementos del mapa
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]

        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }
    ];

    // Establecemos la configuración del componente de google maps
    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
    }

    // Inicializamos el mapa
    var map = new google.maps.Map(document.getElementById('map-container'), map_options);


    var zoomControlDiv = document.createElement('div');
    var zoomControl = new customZoomControl(zoomControlDiv, map);

    // Insertamos la capa de zoom en la parte superior izquierda del mapa.
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);

    getAddress();

    // Añadimos los botones personalizados de zoom en el mapa
    function customZoomControl(controlDiv, map)
    {
        // movemos los elementos del zoom desde el DOM y los insertamos en el mapa.
        var controlUIzoomIn = document.getElementById('baenne-zoom-in'),
            controlUIzoomOut = document.getElementById('baenne-zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Establecemos los eventos listener para el click según el botón pulsado
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom() - 1)
        });
    }

    // Función con la que cargamos el JSON y tratamos que hacer con las coordenadas.
    function getAddress()
    {
        console.log('* LOAD: Se procesa el fichero blocator.json');

        $.get('blocator.json', function(locator) {
            var address = locator.address;
            var latlng = locator.location;
            var zoom = locator.zoom;

            console.log('* LOAD: Procesamos las variables');

            if (zoom == null) {
                zoom = map_zoom;
            }

            // Aplicamos el zoom indicado en el fichero.
            map.setZoom(zoom);

            // El orden de prioridad será coordenadas, y luego dirección.
            if (latlng != null) {
                console.log('* LOAD: Procesamos longitud y latitud.');
                latlng = new google.maps.LatLng(latlng.latitude, latlng.longitude);
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

    // Función con la que procesamos la dirección recibida y calculamos sus coordenadas
    function processAddress(address)
    {
        var geocoder= new google.maps.Geocoder();

        console.log('* LOAD: Empezamos a procesar la direccion');

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                setMarker(results[0].geometry.location);

            } else {
                console.log('** ERROR: No se pudo consegir la geo posición por: ' + status);

            }
        });
    }


    // Función con la que establecemos el marcador en el mapa y a su vez lo centramos.
    function setMarker(locator)
    {
        console.log('* LOAD: Establecemos el marker');
        // Centramos el mapa.
        map.setCenter(locator);

        // Añadimos nuestro marcador personalizado
        var marker = new google.maps.Marker({
            position: locator,
            map: map,
            visible: true,
            icon: marker_url,
        });
    }
});

