import React, { useEffect, useState,useRef } from 'react';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import firebase from 'firebase';
import 'firebase/auth';

const db = firebase.firestore();


function Maps  () {
  const [listCities, setListCities] = useState([]);
  const mapRef = useRef(null);

  useEffect( () =>{

    const fetchCities = async () =>{
      const dataCities = await db.collection('city').limit(10).get();

      setListCities(dataCities.docs.map(doc => ({...doc.data(),id:doc.id})))
    }

    fetchCities();

  },[]);


  const calcRadius = () =>{
    console.log('radius--->',mapRef.current.leafletElement.getZoom())
    return mapRef.current.leafletElement.getZoom();
  }

  return (
    console.log('MAAAA', listCities),
    <Map 
      ref={mapRef}
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
      onzoomend={()=>console.log('zzzzz',mapRef.current.leafletElement.getZoom())}
              //crs={CRS.Simple}  
  >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       {listCities.map((city,ind )=>(
         <CircleMarker key={ind} center={[city.lat || 0, city.lon|| 0]} radius={calcRadius()} color={'red'}>
           {/* daca ai probleme cu Zoom Radius
            https://gis.stackexchange.com/questions/331663/resizing-leaflet-circlemarkers-after-zoom-level-changes
            https://stackoverflow.com/questions/52362608/react-leaflet-find-data-displayed-on-map-when-zoom-level-changes
            https://stackoverflow.com/questions/48263270/catch-event-in-react-leaflet-map
            https://stackoverflow.com/questions/48264529/how-to-get-map-object-in-react-leaflet-on-zoom-change-event
            https://stackoverflow.com/questions/59734211/how-can-i-get-the-current-leaflet-map-zoom-level
            */
          }
         <Popup>
          {city.name} <br /> People: {city.people}
         </Popup>
       </CircleMarker>
       ))

       }
        
        
    </Map>
  )

}

export default Maps;


