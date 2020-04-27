import React ,{useState,Suspense}from 'react';
import './App.css';
import LoginWQ from './components/loginWQ';
import WallWQV2 from './components/wallWQ-v2';
import Maps from './components/Maps';
import WallWQ from './components/wallWQ';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Icon } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next'



function App() {
const [homeClass,setHomeClass] =useState('item active');
const [mapClass,setMapClass] =useState('item');

const menuHome= () =>{  
  setHomeClass('item active')
  setMapClass('item')
}  

const menuMap=() =>{
setMapClass('item active')
setHomeClass('item')
}

 
 return(
  
  <Suspense fallback='Loading'>
    <Router>  
      <div className="App ui container">
      <div className="ui two item menu sticky">
  
          <Link className= {homeClass} onClick={menuHome} to="/"><Icon name='list' />List</Link>
          <Link className= {mapClass} onClick={menuMap}to="/map"><Icon name='map'/> Map</Link>
      </div>
       

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
    </Suspense>

  );
}


export default App;