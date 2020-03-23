import React, { Component } from "react";
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'firebase/auth';
import '../assets/index.less'
import AutoResponsive from 'autoresponsive-react';

const db = firebase.firestore();
const style ={width:100,height:100}

class wallWQ extends Component {
   
state ={
    users:[]
}

componentDidMount = () =>{
   this.fecthAllUsers(); 
   
   window.addEventListener('resize', () => {
    this.setState({
      containerWidth: ReactDOM.findDOMNode(this.refs.container).clientWidth
    });
  }, false);
}

fecthAllUsers = async() =>{
    const allData = [];
    await db.collection('user').get()
        .then(function(querySnapshot) {        
                querySnapshot.forEach(function(doc) {
                    allData.push({ ...doc.data(),id:doc.id })
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });    
    this.setState({users: allData});
      
}

getAutoResponsiveProps() {
   
    return {
      itemMargin: 1,
      containerWidth: this.state.containerWidth || 1127,
      itemClassName: 'item',
      gridWidth: 1,
      transitionDuration: '.5'
    };
  }

render(){
    return (
        console.log(this.state.containerWidth),
        console.log(document.body.clientWidth),
      <div className="albumPanel"> 
            <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
            {
                this.state.users.map((user,ind) => (
                    <a key={user.id} href="#" className='w1 album item' style={style}>
                  
                    <img className="a-cover"
                    alt={"profile img"}
                    src={user.img}
                />                 
                <div className="a-layer">                   
                    <span className="al-title">{user.name}</span>
                    <span className="al-brand">{user.location}</span>
                    <span className="al-count">{user.country}</span>                    
                </div>
                        
                                     
                    </a>
                ))
            }
            </AutoResponsive>
        </div>
        // <ul>
        //  {
           
        //     this.state.users.map(user => (
        //         <li key={user.id}>
        //             <p>{user.name}</p>
        //             <p>{user.location}</p>
        //             <p>latitude:{user.lat}</p>
        //             <p>longitude:{user.lon}</p>
        //             <img
        //                 alt={"profile img"}
        //                 src={user.img}
        //             />                
        //         </li>
        //     ))
        // }
        // </ul>
        );
}



}

export default wallWQ