import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactMapGL from 'react-map-gl'
import Marker from './Marker'
import './Map.css'


function Map(props) {
  const { locations } = props
  const history = useHistory()

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
        <Marker lat={0} lng={0} />
      </ReactMapGL>
    </div>
  );
}

export default Map