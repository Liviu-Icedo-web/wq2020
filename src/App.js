import React, { Component } from 'react';
import './App.css';
import LoginWQ from './components/loginWQ';
import WallWQV2 from './components/wallWQ-v2'
import WallWQ from './components/wallWQ'

class App extends Component {
  render() {
    return (
      <div className="App ui container">
          <LoginWQ />
          <WallWQV2 />
         
      </div>
    );
  }
}
export default App;