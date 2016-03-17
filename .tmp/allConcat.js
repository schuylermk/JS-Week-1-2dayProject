

var googApiKey = require('./../.env').googApiKey;


$(document).ready(function() {
	var geocoder;
	var map;
	function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
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

	var zip = 97215;
	$.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zip + '&proximity_square=10&stolen_after=1451494024', function(response) {
		console.log(response);

		$('body').append("<div>" + response.bikes[0].stolen_location + "</div>");

	});

});
