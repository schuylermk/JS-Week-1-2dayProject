

var googApiKey = require('./../.env').googApiKey;
var geocoder;
var map;
var i = 0;

function myLoop(object) {
	setTimeout(function() {
		console.log(object);
		placeMarkers(object, i);
		i++;
		if (i < object.bikes.length) {
			myLoop(object);
		}
	}, 201)
}
function placeMarkers(bikeData, i) {
	// console.log(bikeData);
	geocoder.geocode( { 'address': bikeData.bikes[i].stolen_location}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});


}
$(document).ready(function() {




	function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(39.8282, -98.5795);
    var mapOptions = {
      zoom: 5,
      center: latlng
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
 initialize();

 function codeAddress() {
		var zip = document.getElementById("zip").value;
		geocoder.geocode( { 'address': zip}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				console.log(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}

	// initMap();
	$('#getLocation').click(function() {
		// var location = $('#zip').val();
		// var geocoder = new google.maps.Geocoder();
		// function zipcode(){}
		codeAddress();

	});





	console.log('foo');

	var zip = 69036;
	$.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&per_page=500&proximity=69036&proximity_square=3000&stolen_after=1451666936', function(response) {
		// console.log(response);
		myLoop(response);
		$('body').append("<div>" + response.bikes[0].stolen_location + "</div>");

	});

});
