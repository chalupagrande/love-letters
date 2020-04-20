import React, { useState, useContext, useRef } from 'react'
import store from '../store'
import { useParams } from 'react-router-dom'
import CaptionedSlider from '../lib/CaptionSlider'


function Letter() {
  let { id } = useParams()
  const posts = useContext(store).posts
  let post = posts.find(p => p.id === id)

  if (!post) return <NoLetterFound />


  const photos = post.photos.map(({ file, tag, id }) => ({
    media: file.publicUrl,
    caption: tag,
  }))
  return (
    <div className="page">
      <CaptionedSlider
        screens={photos}
        bullets={false}
        customContent={<Spectrum audio={post.audio.file} />}
      />
    </div>
  )
}

function Spectrum({ audio }) {
  let audioRef = useRef(null)
  let [muted, setMuted] = useState(false)
  return (
    <div className="spectrum">
      <audio id="audio-element" src={audio.publicUrl} ref={audioRef} autoPlay={true} loop={true} muted={muted} />
      <button onClick={() => setMuted(!muted)}>{muted ? "unmute" : "mute"}</button>
    </div>
  )
}

function NoLetterFound() {
  return (
    <div className="page">
      <p>Oops.</p>
      <p>There was no letter found by that ID</p>
    </div>
  )
}

export default Letter