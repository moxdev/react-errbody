import React from 'react';  // load react
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  constructor() {
     super();

     // this is the initial state 'getInitialState'
     this.state = {
       fishes: {},
       order: {}
     };

     // bind fish method to render with the constructor
     this.addFish = this.addFish.bind(this);
     this.updateFish = this.updateFish.bind(this);
     this.loadSamples = this.loadSamples.bind(this);
     this.addToOrder = this.addToOrder.bind(this);
     this.removeFish = this.removeFish.bind(this);
     this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;  // must set to null to work w/ firebase 
    this.setState({ fishes });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of state
    const order = {...this.state.order};
    // update or add the new number of fish
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
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
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />) 
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          removeFromOrder={this.removeFromOrder} 
        />
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updatedFish={this.updateFish}
          removeFish={this.removeFish} 
        />
      </div>
    )
  }
}

export default App;