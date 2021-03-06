import React, { Component } from 'react'
import CarCard from './CarCard'
import CarForm from './CarForm'
  
export default class CarsList extends Component {
  state = {
      allCars: [],
      display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3001/cars')
    .then(response => response.json())
    .then(data => 
      this.setState({
        allCars: data
    }))
  }

  addNewCar = (car) =>{
    fetch('http://localhost:3001/cars',{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(car)
    })
    .then(resp => resp.json())
    .then(data =>{
      this.setState({
        allCars:[...this.state.allCars, data]
      })
    })
    this.handleClick()
  }

  addToGarage=(car)=>{
    fetch('http://localhost:3001/garage',{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(car)
    })
    .then(resp => resp.json())
    .then(data => console.log('posted',data))
  }

  deleteCar = (car) => {
    fetch(`http://localhost:3001/cars/${car.id}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(car)
    })
    .then(resp => resp.json())
    .then(data =>{
      let carIndex = this.state.allCars.indexOf(car)
      this.state.allCars.splice(carIndex, 1)
      this.setState({
        allCars:[...this.state.allCars]
      })
    })
  }

  render() {
    const renderCars= this.state.allCars.map(carE => <CarCard car={carE} addToGarage={this.addToGarage} deleteCar={this.deleteCar}/>)

    return (
        <div id="page-list">
            <h1>Master Car List</h1>
            <p className="description">Select any car you would like to have in your garage. If we are missing a car you like, please fill out this form.</p>
            {this.state.display ? <CarForm addNewCar={this.addNewCar}/>: null}
            <div className="buttonContainer">
              <button onClick={this.handleClick} className="add-button"> Add Car </button>
            </div>
            {renderCars}
        </div>
    )
  }
}
