var testy = require('./../js/scripts.js').testy;

$(document).ready(function() {
	$('body').append('<div></div>').text(testy()); 
});