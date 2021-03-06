import React from 'react';

class AddFishForm extends React.Component {
  createFish(e) {
    e.preventDefault();
    console.log('slapping da bass');
  }
  render() {
    return (
      <form className="fish-edit" onSubmit={ (e) => this.createFish(e) }>
        <input ref={ (input) => this.name = input } type="text" placeholder="Fish Name" />
        <input ref={ (input) => this.price = input } type="text" placeholder="Fish Price" />
        <select ref={ (input) => this.status = input } >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <input ref={ (input) => this.desc = input } type="text" placeholder="Fish Desc" />
        <input ref={ (input) => this.image = input } type="text" placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddFishForm;