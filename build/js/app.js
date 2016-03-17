(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiID = '6f567babe247b3e1f08d2b1c67abbff60b2bffaae16b557071fa8a952b45d5af';

exports.apiKey = '06b46bfe3da0db118fd1e4a95565d96b07c9343770a1a99c520e09f0d1d062f9';


exports.googApiKey = 'AIzaSyCCkBKuXL1zTXy82-kVC2KA2RnSqqEDB5A';

},{}],2:[function(require,module,exports){


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

},{"./../.env":1}]},{},[2]);
