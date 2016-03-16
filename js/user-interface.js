
$(document).ready(function() {
	var zip = 97204;
	$.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zip + '&proximity_square=100&stolen_after=1451494024', function(response) {
		console.log(response);

		$('body').append('<div></div>').text(response.bikes[0].date_stolen);
	});
});
