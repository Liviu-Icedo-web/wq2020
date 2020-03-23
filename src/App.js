import React, { Component } from 'react';
import './App.css';
import LoginWQ from './components/loginWQ';
import WallWQ from './components/wallWQ'

class App extends Component {
  render() {
    return (
      <div className="App ui container">
          <LoginWQ />
          <WallWQ />
      </div>
    );
  }
}
export default App;