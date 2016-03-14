exports.testy = function() {
	document.write('testy');
	return "testy";
};

var testy = require('./../js/scripts.js').testy;

testy();