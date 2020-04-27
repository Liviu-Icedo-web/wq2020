import React, { Component } from "react";
import firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { Button, Header, Icon, Modal,Checkbox,Divider } from 'semantic-ui-react';
import CountDate from './CountDate';
import FinLockDown from './FinLockDown';
import DateTimeForm from './DateTimeForm';
import DateTimeStop from './DateTimeStop';
import { Helmet } from "react-helmet";
import { withTranslation } from 'react-i18next';
import moment from 'moment';




const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
const headers = { 'Accept-Language': 'en-Us' }



class LoginWQ extends Component {
    state = {
        isSignedIn: false,
        userExist: false,
        countryExist: false,
        cityExist: false,
        fbRes: '',
        fbFirstName: '',
        fbLastName: '',
        fbName: '',
        fbEmail: '',
        fbBirthday: '',
        fbLocation: '',
        fbImg: '',
        country: '',
        country_code: '',
        lat: '',
        lon: '',
        countries: {},
        city: {},
        modalOpen: true,
        startLockDown:'',
        endLockDown:'',
        userMail:'',
        userData:{},
        userStartLockDown:'',
        userEndLockDown:'',
        once: false,
    }

    componentDidMount = () => {
        firebaseApp.auth().onAuthStateChanged(user => {
            this.setState({ 
                    isSignedIn: !!user,
                    userMail: user ? user.email:''
                })
                this.getUserData();
            if (!!this.state.fbRes) {
                this.createUser();
                console.log('State Component', this.state)
            }            
        })

    }

    createUser = async () => {
        var that = this;
        //Check if user exist
        await db.collection("user").where("email", "==", this.state.fbEmail).get().then(function (querySnapshot) {
            //await db.collection("user").where("email", "==","iliuta@yo.com").get().then(function(querySnapshot) {
            querySnapshot.forEach(function (doc) {
                that.setState({ userExist: !!doc.id })
            });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });;

        //if FALSE WE ADD IT
        if (!this.state.userExist) {
            await fetch('https://nominatim.openstreetmap.org/search/' + this.state.fbLocation + '?format=json&addressdetails=1&limit=1', { headers })
                .then(res => res.json())
                .then(data =>
                    this.setState({
                        country: data[0].address.country,
                        country_code: data[0].address.country_code,
                        lat: data[0].lat,
                        lon: data[0].lon,
                    }),

                )
                .catch(error => console.log('Error getting map location', error));
            //Get Country
            const country = await db.collection("countries").where("iso", "==", this.state.country_code).get();
            country.docs.map(doc => (this.setState({ countries: { ...doc.data(), id: doc.id }, countryExist: !!doc.id })))
            //Add Country or Increase number
            if (!this.state.countryExist) {
                db.collection("countries").add({
                    add_date: firebase.firestore.Timestamp.fromDate(new Date()),
                    iso: this.state.country_code,
                    name: this.state.country,
                    people: 1
                })
                    .then()
                    .catch(error => console.log('Error add Country', error))
            } else {
                db.collection("countries").doc(this.state.countries.id).update({ people: this.state.countries.people + 1 })
            }

            //Get City
            const city = await db.collection("city").where("name", "==", this.state.fbLocation).get();
            city.docs.map(doc => (this.setState({ city: { ...doc.data(), id: doc.id }, cityExist: !!doc.id })))
            //Add City or Increase Number
            if (!this.state.cityExist) {
                db.collection("city").add({
                    add_date: firebase.firestore.Timestamp.fromDate(new Date()),
                    country_iso: this.state.country_code,
                    name: this.state.fbLocation,
                    lat: this.state.lat,
                    lon: this.state.lon,
                    people: 1
                })
                    .then()
                    .catch(error => console.log('Error add City', error))
            } else {
                db.collection("city").doc(this.state.city.id).update({ people: this.state.city.people + 1 })
            }

            //Add user
            db.collection("user").add({
                add_date: firebase.firestore.FieldValue.serverTimestamp(),
                birthday: this.state.fbBirthday,
                country: this.state.country_code,
                email: this.state.fbEmail,
                img: this.state.fbImg,
                first_name: this.state.fbFirstName,
                last_name: this.state.fbLastName,
                name: this.state.fbName,
                location: this.state.fbLocation,
                lat: this.state.lat,
                lon: this.state.lon,
                start_lock_down: this.state.startLockDown,
                end_lock_down: this.state.endLockDown
            }).then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                
            })
            .catch(error => {
                    console.error("Error adding document: ", error);
            });
            this.getUserData();
        }

    };

    wqAuth = () => {
        provider.addScope('user_hometown');
        provider.addScope('user_location');
        provider.addScope('user_birthday');

        var that = this;
        firebaseApp.auth().signInWithPopup(provider)
            .then(function (result) {
                that.setState({
                    fbRes: result,
                    fbFirstName: result.additionalUserInfo.profile.first_name,
                    fbLastName: result.additionalUserInfo.profile.last_name,
                    fbName: result.additionalUserInfo.profile.name,
                    fbEmail: result.additionalUserInfo.profile.email,
                    fbBirthday: result.additionalUserInfo.profile.birthday,
                    fbLocation: result.additionalUserInfo.profile.location.name,
                    fbImg: result.additionalUserInfo.profile.picture.data.url,
                })
            })
            .catch(err => { console.log('Error al traer el dado desde facebook', err) })
    }


    getUserData = async()=> {
        const user = await db.collection("user").where("email", "==", this.state.userMail).get();
        user.docs.map(doc => (this.setState({ userData: { ...doc.data(), id: doc.id }})))
    }


    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    toggleOnce = () => this.setState((prevState) => ({ once: !prevState.once }))

    onAddStartLock = dateStart => {this.setState({startLockDown:dateStart})}
    onAddEndLock = dateEnd => {this.setState({endLockDown:dateEnd})}
    render() {
        const { t } = this.props;
        return (
            <div className="loginWq">
                <div className="userProfile">
                    {this.state.isSignedIn ? (
                        this.getUserData,
                        <div className='header-user'>
                            <div className='welcome-user'>
                                <Helmet>
                                    <meta charSet="utf-8" />
                                    <title>WQ 2020 {firebaseApp.auth().currentUser.displayName}</title>
                                    <link rel="canonical" href="http://mysite.com/example" />
                                </Helmet>
                                <h1>Wall Quarantine 2020</h1>
                                <img
                                    className="userRainbow"
                                    alt="profile picture"
                                    //https://codepen.io/apeandme/pen/JZjbeG
                                    //https://codepen.io/mstenquist/pen/GRRrNQZ
                                    //src={firebaseApp.auth().currentUser.photoURL}
                                    src={this.state.userData.img}
                                //src={this.state.fbImg}
                                />
                                <h1>{t('allok')}</h1>
                            </div>
                           {console.log('UUU', this.state.userData)}

                            {
                               this.state.userData.end_lock_down != undefined ?
                               <FinLockDown
                                timeStart= {convertDate(this.state.userData.start_lock_down)}
                                timeStop = {convertDate(this.state.userData.end_lock_down)}
                                userData={this.state.userData}
                                />
                                :
                                <CountDate 
                                timeStart= {convertDate(this.state.userData.start_lock_down)}
                                userData={this.state.userData} />
                            }
                            
                            <button className='ui button basic tiny red' onClick={() => firebaseApp.auth().signOut()}>{t('dezauth')}</button>
                        </div>
                    ) :
                        (//START NO LOGIN
                            <Modal
                                basic
                                size='small'
                                trigger={<Button onClick={this.handleOpen} color='facebook'><Icon name='facebook' />{t('auth')}</Button>}
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                basic
                                size='small'
                            >
                                <Helmet>
                                    <meta charSet="utf-8" />
                                    <title>WQ 2020 </title>
                                    <link rel="canonical" href="http://mysite.com/example" />
                                </Helmet>
                                <Header icon='globe' content='World Quarantine 2020' />
                                <Modal.Content>
                                    <p>
                                        {t('bePart')}
                                    </p>
                                </Modal.Content>
                               
                                <Modal.Actions>
                                <Divider />
                                    <div>
                                        <p>{t('chooseDate')}</p>
                                        <DateTimeForm 
                                                onAddStartLock={this.onAddStartLock}
                                        />
                                    </div>
                                    
                                    <Divider />
                                    <p>{t('txtChooseLockDown')}</p>
                                    <Checkbox
                                        checked={this.state.once}
                                        onChange={this.toggleOnce}
                                        toggle
                                    />
                                    {
                                    this.state.once ?
                                    <DateTimeStop 
                                        onAddEndLock={this.onAddEndLock}
                                    />
                                    :
                                    ''
                                    
                                    }


                                    <Divider />
                                    <div>
                                        <Button color='facebook' onClick={this.wqAuth}>
                                            <Icon name='facebook' /> {t('auth')}
                                        </Button>
                                    </div>
                                </Modal.Actions>
                            </Modal>
                        )//FIN NO LOGIN
                    }
                </div>
            </div>
        )
    }
}


function convertDate(date){
    let timeTillDate= date !== undefined ? date.toDate() : moment() 
    let timeFormat="MM DD YYYY, h:mm a"
    console.log('NNNN', moment(timeTillDate,timeFormat))
    return moment(timeTillDate,timeFormat)
}
export default withTranslation()(LoginWQ);