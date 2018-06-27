import React, { Component } from 'react';

var ReactRouter = require('react-router-dom');

var Home = require('./Home');
var Nav = require('./Nav');
var Forecast = require('./Forecast');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;




class App extends Component {
  render() {
    return (
      <Router>
      <div className="app">
        <Nav/>

        <Switch>
          <Route exact path='/' component = {Home}/>
          <Route path='/forecast' component = {Forecast}/>
          <Route render={function(){
                return <p>Not Found</p>;
              }} />


        </Switch>
        
      </div>
      </Router>
    );
  }
}

export default App;
