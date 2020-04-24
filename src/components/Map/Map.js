import React, { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import Marker from './Marker'
import debounce from '../../lib/debounce'
import './Map.css'


function Map(props) {
  const { locations, onClick } = props
  const markers = locations.map(l=> <Marker key={l.id} {...l} onClick={()=> {
    onClick(l)
  }}/>)

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 68 - 30,
    latitude: 20,
    longitude: 0,
    zoom: 1
  });

  useEffect(()=> {
    const handleResize = debounce((e)=> {
      setViewport({...viewport, width: window.innerWidth, height: window.innerHeight - 68 - 30})
    }, 500)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })


  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
      {...viewport}
      onViewportChange={setViewport}
    >
      {markers}
    </ReactMapGL>
  );
}

export default Map