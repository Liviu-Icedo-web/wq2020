import React, { useEffect, useState } from 'react';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import firebase from 'firebase';
import 'firebase/auth';

const db = firebase.firestore();


function Maps  () {
  const [listCities, setListCities] = useState([]);

  useEffect( () =>{

    const fetchCities = async () =>{
      const dataCities = await db.collection('city').get();

      setListCities(dataCities.docs.map(doc => ({...doc.data(),id:doc.id})))
    }

    fetchCities();

  },[]);

  return (
    console.log('MAAAA', listCities),
    <Map 
      center={[51.505, -0.09]} 
      zoom={3}
      maxZoom={10}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
              easeLinearity={0.35}  
              //crs={CRS.Simple}  
  >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       {listCities.map((city,ind )=>(
         <CircleMarker key={ind} center={[city.lat || 0, city.lon|| 0]} radius={30} color={'red'}>
         <Popup>
          {city.name} <br /> {city.people}
         </Popup>
       </CircleMarker>
       ))

       }
        
        
    </Map>
  )

}

export default Maps;


