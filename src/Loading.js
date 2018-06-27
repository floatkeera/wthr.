var React = require('react');
var PropTypes = require('prop-types');

var styles={
	content:{
		textAlign: 'center',
		fontSize: '24pt'
	}
};

class Loading extends React.Component{
	constructor(props){
		super(props);

		this.state={
			text: props.text,

		};
	}

	componentDidMount(){
		var stopper = this.props.text + '...';
		this.interval = window.setInterval(function(){
			if(this.state.text == stopper){
				this.setState(function(){
					return{
						text: this.props.text,
					};
				});
			} else{
				this.setState(function(prevState){
					return{
						text: prevState.text + '.'
					};
				});
			}
		}.bind(this), this.props.interval);
	}

	render() {
		return (
			<p style={styles.content}>
				{this.state.text}

			</p>
		);
	}

	componentWillUnmount(){ //when the component is removed from the view, we clear the interval listener
		window.clearInterval(this.interval);
	}
}

Loading.propTypes={
	text: PropTypes.string.isRequired,
	interval: PropTypes.number.isRequired

};

Loading.defaultProps={
	text:'Loading',
	interval: 300
};

module.exports = Loading;

