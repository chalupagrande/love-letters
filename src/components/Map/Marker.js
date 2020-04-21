import React, {useState} from 'react'
import {Marker as ReactMapGLMarker} from 'react-map-gl'
const circle = require("../../assets/images/circle.svg")
const heart = require("../../assets/images/heart.svg")


function Marker(props) {
  const {lat, lng, id, onClick} = props
  let [isHovered, setIsHovered] = useState(false)

  return (
    <ReactMapGLMarker
      latitude={lat}
      longitude={lng}
      captureClick={false}
      offsetLeft={-10}
      offsetTop={-10}
      draggable={false}>
        <div className="pin"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}>
          <img src={isHovered ? heart : circle} alt="point" />
        </div>
    </ReactMapGLMarker>
  )
}

export default Marker