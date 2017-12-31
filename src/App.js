import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import ExampleContract from '../build/contracts/SimpleAuction.json'

import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }

    this.getValue = this.getValue.bind(this);
    this.getHigh = this.getHigh.bind(this);
    this.handleAmountPrice = this.handleAmountPrice.bind(this);

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }
  getHigh(){
    const contract = require('truffle-contract')
    const simpleStorage = contract(ExampleContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.highestBidder.call(accounts[0])
      }).then((result) => {
        console.log(result)

        // Update state with the result.
        return this.setState({ highValue: result })
      })
    })
  }

  getValue(){
    const contract = require('truffle-contract')
    const simpleStorage = contract(ExampleContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        console.log(this.state.amount)
        return simpleStorageInstance.bid({ from: accounts[0], value: this.state.amount, gas: 2000000 })
      }).then((result) => {
        // Update state with the result.
        console.log("Bid successfully")
        return simpleStorageInstance.highestBidder.call(accounts[0])
        //return this.setState({ contractValue: result.c[0] })
      }).then((result) => {
                console.log(result)

        // Update state with the result.
        return this.setState({ highValue: result.c[0] })
      })
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }


  handleAmountPrice(event) {
    this.setState({amount: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <h2>Smart Contract Example</h2>

              <button onClick={this.getValue}>
                Bid
              </button>
              <button onClick={this.getHigh}>
                High bid address
              </button>
              <label>
                USD:
                <input type="text" value={this.state.amount} onChange={this.handleAmountPrice} />
              </label>
              <p>High bid example: {this.state.highValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
