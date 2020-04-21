import React, { useState, useContext, useRef } from 'react'
import store from '../../store'
import CaptionedSlider from '../../lib/CaptionSlider'


function Letter(props) {
  let { id } = props
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
      />
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