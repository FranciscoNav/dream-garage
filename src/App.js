import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import CarList from './components/CarsList'
import MyGarage from './components/MyGarage'
import ShowCase from './components/ShowCase'

class App extends Component {

  render() {
    return (
      <Router>
        <NavBar/>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cars" component={CarList}/>
            <Route exact path="/garage" component={MyGarage}/>
            <Route exact path="/garage/:id" component={ShowCase}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
