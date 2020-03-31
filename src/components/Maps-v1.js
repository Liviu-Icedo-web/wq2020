import React, { Component } from 'react'
import { Map, TileLayer, CircleMarker, Popup ,Circle} from 'react-leaflet'
import {CRS} from 'leaflet';



export default class SimpleExample extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 3,
    
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map 
        center={position} 
        zoom={this.state.zoom}
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
         
          <CircleMarker center={[51.505, -0.091]} radius={30} color={'red'}>
            <Popup>
             London <br /> 1500.
            </Popup>
          </CircleMarker>
          <CircleMarker center={[40.4167047, -3.7035825]} radius={30} color={'red'}>
            <Popup>
              Madrid. <br /> 81,000.
            </Popup>
          </CircleMarker>
          <CircleMarker center={[45.8221656,23.3352824]}radius={5}>
            <Popup>
              Cugir <br /> 200.
            </Popup>
          </CircleMarker>
      </Map>
    )
  }
}