var expect = require('chai').expect;
var testy = require('./../js/scripts.js').testy;

describe(testy, function() {
	it('should return testy', function() {
		expect(testy()).to.equal('testy');
	});
});