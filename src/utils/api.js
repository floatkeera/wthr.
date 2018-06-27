var axios = require('axios');
var ID = 'b714ec74bbab5650795063cb0fdf5fbe';
var googleKey = 'AIzaSyBXJ5r6AdhbFUxUPzhsWrSivQERpPE1fGY';
var Places = require('google-places-web');

Places.apiKey = googleKey;

/*function getPhotoRef(city){
	var URI = window.encodeURI('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + city + '&key=' + googleKey);
	
	console.log(URI);
	return axios.get(URI).then(function(response){

		return response.results[0];

	});
}*/

module.exports = {
	getCurrentWeather: function(city){
		var encodedURI = window.encodeURI('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&type=accurate&APPID=' + ID);

		return axios.get(encodedURI).then(function(response){
			return response.data;
		});

	},
	getForecast: function(city){
		var encodedURI = window.encodeURI('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&type=accurate&APPID='+ ID+'&cnt=5');
			
		return axios.get(encodedURI).then(function(response){
			return response.data.list;
		});

	},
	getCityPhoto: function(city) {
		
		
		var parameters = {
			query: city
		};

		

		

	}

	/*function(city){
		console.log(getPhotoRef(city));

		var URI = window.encodeURI('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&key=' + googleKey + '&photoreference=' + getPhotoRef(city));
		
		return URI;


	}*/
};