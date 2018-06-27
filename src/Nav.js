var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;
var InputGroup = require('react-bootstrap').InputGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;

var Link = require('react-router-dom').Link;
class Nav extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			city: ''
		}

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
	


	render() {
		return (
			<Navbar fixedTop = {true}>
				<Navbar.Brand>
				 	<a href="/">wthr.</a>
    			</Navbar.Brand>
    			 <Navbar.Form pullRight>
			      <InputGroup>
			        <FormControl type="text" placeholder="Weather in..." onChange={this.handleChange} />
			        <InputGroup.Button>
			        <Link
					to={{
						pathname: '/forecast',
						search: '?city=' + window.encodeURI(this.state.city)}}
						key={this.state.city}>

			        	<Button
			        	id="navSearch">
			        	 <Glyphicon glyph="search" />
			        	 </Button>
			        	 </Link>
			        </InputGroup.Button>
			      </InputGroup>{' '}
			    </Navbar.Form>
			</Navbar>
		);
	}
}

module.exports = Nav;