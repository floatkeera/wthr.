

var Places = require('google-places-web');

var React = require('react');
var queryString = require('querystringify');
var api = require('./utils/api');
var axios = require('axios');
var Loading = require('./Loading');
var googleKey = 'AIzaSyCe8xzXoaAJBidxNC8P_cYnzsUcZyLrZAA';
var dateFormat = require('dateformat');
var googleMapsClient = require('@google/maps').createClient({
  key: googleKey
});

var service;


Places.apiKey = googleKey;
Places.debug = true;


class Forecast extends React.Component{


	constructor(props){
		super(props);

		this.state = {
			loading: true,
			weatherID: null,
			description: null,
			city: null,
			currentTemp: null,
			photo: null,
			forecast: null
		};
	}


	componentDidMount(){
		service = new window.google.maps.places.PlacesService(document.createElement('div'));
		this.getData();

	}

	componentDidUpdate(prevProps, prevState){
		
		if(prevProps.location.search != this.props.location.search){
			this.getData();
		}
	}
	

	getData(){
		var city = queryString.parse(this.props.location.search).city;

		console.log(city);

		var request = {query: city, fields: ['photos', 'name']};
		service.findPlaceFromQuery(request, function(results, status){
			/*this.setState({
				photo: );*/
			this.setState({
				photo: results[0].photos[0].getUrl({'maxWidth': 1280, 'maxHeight': 800})
			});

		}.bind(this));
		
	

		


			axios.all([api.getCurrentWeather(city), api.getForecast(city)])
			.then(function(data){
			console.log(data[0]);
			this.setState({
				loading: false,
				weatherID: data[0].weather[0].id,
				description: data[0].weather[0].description,
				currentTemp: this.kToF(data[0].main.temp),
				humidity: data[0].main.humidity,
				city: data[0].name,
				forecast: data[1]
			});

			
		}.bind(this));
		
		
		

	}

	kToF(kelvin){
		return Math.round(kelvin * (9/5) - 459.67);
	}


	

	
	render() {

		return (
			<div className= "app">
			<div className="forecastbefore" style={{

				backgroundImage: 'url(' + this.state.photo + ')',
				'backgroundSize': 'cover',
				'WebkitFilter': 'blur(5px) brightness(50%)'
						

			}} />
			<div className = "forecast">
				{(this.state.loading && 
					<Loading/>)}

				{!this.state.loading &&
					<div 
					>
						<h1 >{this.state.city.toUpperCase()}</h1>
						<h2>CURRENT CONDITIONS</h2>

						<div className="conditions">
							<i className = {'owf owf-' + this.state.weatherID + ' owf-5x'}></i>
							<p className="bigTemp">{this.state.currentTemp + '°'}</p>
						</div>
						<div className="currentdesc">
							<p>{this.state.description}</p>
							<p>humidity: {this.state.humidity + '%'}</p>
								
						</div>
						<div className="fiveDaysWrapper">
						<h2>5-DAY FORECAST</h2>
						<div className="fivedays">
						{this.state.forecast.map(function(obj){
							var min = this.kToF(obj.temp.min);
							var max = this.kToF(obj.temp.max);
							var date = new Date(obj.dt * 1000);
							var formattedDate = dateFormat(date, 'dddd');
							var weatherID = obj.weather[0].id;
							var weatherDesc = obj.weather[0].description;

							return(<div className="day" key={obj.dt}>
								<p className="date">{(formattedDate).toUpperCase()}</p>
								<i className = {'owf owf-' + weatherID + ' owf-5x'}></i>
								<p className="description">{weatherDesc}</p>
								<p className="temp"><b>{min + '° | ' + max + '°'}</b></p>
								
								</div>);
						}.bind(this))}
						</div>

						

						</div>
					</div>}


			</div>
			</div>
		);
	}
}

class Day extends React.Component{
	



}



module.exports = Forecast;