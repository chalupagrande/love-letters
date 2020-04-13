import React, { useRef } from 'react'
import './Card.css'

function Card(props) {
  const { location, images, audio } = props
  const imageURL = `http://localhost:1337/${images[0].url}`
  const audioURL = `http://localhost:1337/${audio[0].url}`

  let audioRef = useRef(null)
  function play() {
    audioRef.current.play()
  }

  return (
    <div className="card">
      <img src={imageURL} />
      <audio className="audio" controls ref={audioRef} src={audioURL} controls />
    </div>
  )
}

export default Card