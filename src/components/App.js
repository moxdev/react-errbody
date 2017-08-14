import React from 'react';  // load react
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
     super();

     // this is the initial state 'getInitialState'
     this.state = {
       fishes: {},
       order: {}
     };

     // add fish method to constructor
     this.addFish = this.addFish.bind(this);
     this.loadSamples = this.loadSamples.bind(this);
  }

  addFish(fish) {
    // copy of the current state into a new const (best practice so not to overide initial state)
    const fishes = {...this.state.fishes}; // copies initial state into fishes

    // add new fish
    const timestamp = Date.now();
    fishes[`fishes-${timestamp}`] = fish;  

    // set state
    this.setState({ fishes });  // ES6 for fishes: fishes
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }
   
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            { 
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]} />) 
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;