import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import Marker from './Marker'
import './Map.css'


function Map(props) {
  const { locations } = props
  const markers = locations.map(l=> <Marker key={l.id} {...l}/>)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 69px)',
    latitude: 20,
    longitude: 0,
    zoom: 1.8
  });

  return (
    <div className="map-container">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        {...viewport}
        onViewportChange={setViewport}
      >
        {markers}
      </ReactMapGL>
    </div>
  );
}

export default Map