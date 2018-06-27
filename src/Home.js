var React = require('react');

var Button = require('react-bootstrap').Button;
var Form = require('react-bootstrap').Form;
var FormControl = require('react-bootstrap').FormControl;
var Link = require('react-router-dom').Link;

class Home extends React.Component{

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className='home'>
				<div className="box"> 
					<h1>Real-time weather forecast</h1>
					<CityInput/>
				</div>
			</div>
		);
	}
}

class CityInput extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			city: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){

		var val = event.target.value;
		this.setState(function(){
			return {
				city: val
			};
		});
	}

/*	handleSubmit(event){
		event.preventDefault();

		this.props.onClick(this.state.city);

	}*/

	render() {
		return (
			<Form inline>
	    		<FormControl type="text" bsSize="lg" placeholder="City, State" onChange={this.handleChange} required="true"/>
				<Link
					to={{
						pathname: '/forecast',
						search: '?city=' + window.encodeURI(this.state.city)
					}}><Button bsStyle="primary" type="submit" bsSize="lg">Get Weather</Button></Link>
			</Form>
		);
	}

}

module.exports = Home;