import React, {useState} from 'react'
import { Map as RMap, TileLayer, Marker, Popup } from 'react-leaflet'
import {useHistory} from 'react-router-dom'
import * as L from 'leaflet'
import './Map.css'

const circleMarker = L.icon({
  iconUrl: require('../../assets/images/circle.svg'),
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
})

const heartMarker = L.icon({
  iconUrl: require('../../assets/images/heart.svg'),
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
})



function Map(props) {
  const {locations} = props
  const history = useHistory()
  let [isHeart, setIsHeart] = useState(null)

  function goToMarker(l){
    history.push(`/letter/${l.id}`)
  }

  function swapIcon(id){
    setIsHeart(id || null)
  }

  const markers = locations.map(l => (
    <Marker key={l.id} position={l} onClick={()=> goToMarker(l)} icon={isHeart === l.id ? heartMarker : circleMarker} onMouseOver={()=> swapIcon(l.id)} onMouseOut={()=> swapIcon()}>
      <Popup>
        {l.lat}, {l.lng}
      </Popup>
    </Marker>
  ))

  return (
    <div className="map-container">
      <RMap id='map' center={[0,0]} zoom={2} minZoom={1.6}>
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        />
        {markers}
      </RMap>
    </div>
  )
}

export default Map