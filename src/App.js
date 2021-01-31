import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    message: "Gathass"
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(res => res.body)
      .then((data) => {
        this.setState({ contacts: data })
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.message}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
