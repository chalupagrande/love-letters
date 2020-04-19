import React, {useState} from 'react'
import {Marker as ReactMapGLMarker} from 'react-map-gl'
import {useHistory} from 'react-router-dom'
const circle = require("../../assets/images/circle.svg")
const heart = require("../../assets/images/heart.svg")


function Marker({lat, lng, id}) {
  let [isHovered, setIsHovered] = useState(false)
  let history = useHistory()

  return (
    <ReactMapGLMarker
      latitude={lat}
      longitude={lng}
      captureClick={false}
      offsetLeft={-10}
      offsetTop={-10}
      draggable={false}>
        <div className="pin"
          onClick={()=> history.push(`/letter/${id}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}>
          <img src={isHovered ? heart : circle} alt="point" />
        </div>
    </ReactMapGLMarker>
  )
}

export default Marker