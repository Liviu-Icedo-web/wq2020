import React, { Component } from "react";
import firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
const headers = { 'Accept-Language': 'en-Us' }


class LoginWQ extends Component {
    state = {   isSignedIn: false,
                userExist:false, 
                countryExist:false,
                cityExist:false,
                fbRes:'',                
                fbFirstName:'',
                fbLastName:'',
                fbName:'',
                fbEmail:'',
                fbBirthday:'',
                fbLocation:'',
                fbImg:'',
                country:'',
                country_code:'',
                lat:'',
                lon:'',
                countries:{},
                city:{},
            }
    componentDidMount = () => {        
        firebaseApp.auth().onAuthStateChanged( user => {
        this.setState({ isSignedIn: !!user })                     
        if(!!this.state.fbRes){
            this.createUser();
            console.log('State Component',this.state)
        }
        
    })
    
    
    }

    createUser = async () => {
        var that = this;
        //Check if user exist
        await db.collection("user").where("email", "==",this.state.fbEmail).get().then(function(querySnapshot) {
        //await db.collection("user").where("email", "==","iliuta@yo.com").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    that.setState({userExist: !!doc.id})
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });;      
        
        //if FALSE WE ADD IT
        if(!this.state.userExist){
            await fetch('https://nominatim.openstreetmap.org/search/'+this.state.fbLocation+'?format=json&addressdetails=1&limit=1', { headers })            
                   .then(res => res.json())
                    .then(data =>                         
                        this.setState({
                            country:data[0].address.country,
                            country_code:data[0].address.country_code,
                            lat:data[0].lat,
                            lon:data[0].lon,
                        }),
                        
                        )
            .catch(error => console.log('Error getting map location', error));
            //Get Country
            const country = await db.collection("countries").where("iso", "==", this.state.country_code).get();
              country.docs.map(doc => ( this.setState( { countries: { ...doc.data(),id:doc.id }, countryExist: !!doc.id } ) ) )
            //Add Country or Increase number
            if(!this.state.countryExist){
                db.collection("countries").add({
                    add_date: firebase.firestore.Timestamp.fromDate(new Date()),
                    iso:this.state.country_code,
                    name:this.state.country,                    
                    people:1
                })
                .then()
                .catch(error => console.log('Error add Country', error))
            }else{
                db.collection("countries").doc(this.state.countries.id).update({people:this.state.countries.people+1})
            }  

            //Get City
            const city = await db.collection("city").where("name", "==", this.state.fbLocation).get();
              city.docs.map(doc => ( this.setState( { city: { ...doc.data(),id:doc.id }, cityExist: !!doc.id } ) ) )
            //Add City or Increase Number
            if(!this.state.cityExist){
                db.collection("city").add({
                    add_date: firebase.firestore.Timestamp.fromDate(new Date()),
                    country_iso:this.state.country_code,
                    name:this.state.fbLocation,
                    lat:this.state.lat,
                    lon:this.state.lon,
                    people:1
                })
                .then()
                .catch(error => console.log('Error add City', error))
            }else{
                db.collection("city").doc(this.state.city.id).update({people:this.state.city.people+1})
            }

            //Add user
            db.collection("user").add({
                add_date: firebase.firestore.FieldValue.serverTimestamp(),
                birthday:this.state.fbBirthday,
                country:this.state.country_code,
                email:this.state.fbEmail,
                img:this.state.fbImg,
                first_name:this.state.fbFirstName,
                last_name:this.state.fbLastName,
                name:this.state.fbName,
                location:this.state.fbLocation,
                lat:this.state.lat,
                lon:this.state.lon,
            }).then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });       
        }
        
        console.log('State createUser--->',this.state)
      
      };

    wqAuth = () => {    
        provider.addScope('user_hometown');
        provider.addScope('user_location');
        provider.addScope('user_birthday');
              
        var that = this;
        firebaseApp.auth().signInWithPopup(provider) 
            .then(function(result) {
                that.setState({ fbRes: result,
                                fbFirstName:result.additionalUserInfo.profile.first_name,
                                fbLastName:result.additionalUserInfo.profile.last_name,
                                fbName:result.additionalUserInfo.profile.name,
                                fbEmail:result.additionalUserInfo.profile.email,
                                fbBirthday: result.additionalUserInfo.profile.birthday,
                                fbLocation:result.additionalUserInfo.profile.location.name,
                                fbImg:result.additionalUserInfo.profile.picture.data.url,
                            })                 
            })
            .catch(err => { console.log('Error al traer el dado desde facebook',err) })
    }
    
    render() {
        return (
        <div className="loginWq"> 
            <div className="userProfile">
                {this.state.isSignedIn ? (
                <span>
                    <h1>Wall Quarantine 2020</h1>
                <img
                    className="userRaibow"
                    alt="profile picture"
                    //src={firebaseApp.auth().currentUser.photoURL}
                    src={'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10218889328518885&height=100&width=100&ext=1587249789&hash=AeSfb0hgOrfzhoW_'}
                    //src={this.state.fbImg}
                    />
                    
                    <h1>Totul va fi bine !!!</h1> 
                    <p>{firebaseApp.auth().currentUser.displayName}</p>
                    <button onClick={() => firebaseApp.auth().signOut()}>Sign out!</button>
                    
                </span>
                ) : (
                <button onClick={this.wqAuth}>Login facebook</button>
                )}
               </div> 
        </div>
        )
    }
    }

export default LoginWQ