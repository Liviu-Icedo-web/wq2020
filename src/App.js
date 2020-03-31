import React, { Component } from 'react';
import './App.css';
import LoginWQ from './components/loginWQ';
import WallWQV2 from './components/wallWQ-v2';
import Maps from './components/Maps';
import WallWQ from './components/wallWQ';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {
  return (
    // <div className="App ui container">
    //   <LoginWQ />
    //   <WallWQV2 />
    //   <Maps />

    // </div>


    <Router>
      <div className="App ui container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <LoginWQ />
            <WallWQV2 />
          </Route>
          <Route path="/map">
            <Maps />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function MapView() {
  return <h2>BAAA</h2>;
}

function Home() {
  return <h2>Home</h2>;
}


export default App;