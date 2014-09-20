var map;
var geocoder;

$(function() {
	
	console.log('test load 1');
	google.maps.event.addDomListener(window, 'load', initMap);

});


function initMap()
{

	console.log('test load 2');
	geocoder = new google.maps.Geocoder();

	// Establecemos coordenadas por defecto (Infinite Loop).
	var lat = 37.3317389;
	var lng = -122.0308209;

	var latlng = new google.maps.LatLng(lat, lng);

	// Definimos el mapa
	var mapOptions = {
		zoom: 13,
		center: latlng,
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
					map.setCenter(latlng);				
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
}