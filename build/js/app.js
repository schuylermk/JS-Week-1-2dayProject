(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.googApiKey = 'AIzaSyCCkBKuXL1zTXy82-kVC2KA2RnSqqEDB5A';

},{}],2:[function(require,module,exports){


var googApiKey = require('./../.env').googApiKey;
var geocoder;
var map;
var i = 0;



$(document).ready(function() {

	function myLoop(object) {
		setTimeout(function() {
			placeMarkers(object, i);
			i++;
			if (i < object.bikes.length) {
				myLoop(object);
			}
		}, 400);
	}

	function placeMarkers(bikeData, i) {
		geocoder.geocode( { 'address': bikeData.bikes[i].stolen_location}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var image = './../img/red-bike.ico';
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon: image
				});
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}

	function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.02, -100.25);
    var mapOptions = {
      zoom: 5,
      center: latlng
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
 initialize();

 function codeAddress() {
 	var zip = document.getElementById("zip").value;

	// Get latitude and longitude from zipcode (with .location)
 	geocoder.geocode( { 'address': zip}, function(results, status) {
 		if (status == google.maps.GeocoderStatus.OK) {
			// map = new google.maps.Map(document.getElementById("map"), mapOptions);
 			map.setCenter(results[0].geometry.location);
			map.setZoom(13);
			// var mapOptions = {
	    //   zoom: 10
	    // };
 			console.log(results[0].geometry.location);
			var image = './../img/red-bike.ico';
 			var marker = new google.maps.Marker({
 				map: map,
 				position: results[0].geometry.location,
				icon: image
 			});
 		} else {
 			alert("Geocode was not successful for the following reason: " + status);
 		}
 	});
	$.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&per_page=15&proximity=' + zip + '&proximity_square=12000', function(response) {
		console.log(response);


		for (var i = 0; i < response.bikes.length; i++) {
			var bike = response.bikes[i];
			$('#local-info').append("<h4>" + bike.stolen_location + "</h4>" + "<p>" + bike.frame_colors + " " + bike.title + "</p>" + "<hr>");
		}

	});
 }

	$('#getLocation').click(function() {
		$('#local-info').empty();
		codeAddress();
	});

	var zip = 69036;
	$.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&per_page=15&colors=pink&proximity=69036&proximity_square=3000', function(response) {
		myLoop(response);

	});
});

},{"./../.env":1}]},{},[2]);
