import React, { Component } from 'react';
import NavBar from './components/navbar'
import AudioContainer from './components/audioContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <AudioContainer />
      </div>
    );
  }
}

export default App;
