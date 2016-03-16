(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){



$(document).ready(function() {
	var zip = 97204;
	$.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zip + '&proximity_square=100&stolen_after=1451494024', function(response) {
		console.log(response);

		$('body').append('<div></div>').text(response.bikes[0].date_stolen);
	});
});

},{}]},{},[1]);
