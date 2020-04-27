import React, { Component } from "react";
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'firebase/auth';
import './assets/index.less';
import UserItem from './UserItem';
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
        console.log("wallWQ 1 -- ",this.state.containerWidth),
        console.log("wallWQ 2 -- ",this.refs.container),
      <div className="albumPanel"> 
            <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
            {
                this.state.users.map((userItem, ind) => (                   
                <a key={userItem.id} href="#" className='w1 album item' style={style}>                  
                    <UserItem userItem={userItem}  />        
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
        // </ul> https://codesandbox.io/embed/arbabacar-1lyux --> tiene el Filer que necesitas
        // https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki -> Search tags

        );
}



}

export default wallWQ