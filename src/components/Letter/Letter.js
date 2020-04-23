import React, { useContext } from 'react'
import store from '../../store'
import CaptionedSlider from '../../lib/CaptionSlider'
import './Letters.css'


function Letter(props) {
  let { id } = props
  const posts = useContext(store).posts
  let post = posts.find(p => p.id === id)

  if (!post) return <NoLetterFound />


  const photos = post.photos.map(({ file, tag, id }) => ({
    backgroundColor: '#ffffff',
    media: file.publicUrl,
  }))
  return (
      <CaptionedSlider
        screens={photos}
        bullets={false}
      />
  )
}

function NoLetterFound() {
  return (
    <div>
      <p>Oops.</p>
      <p>There was no letter found by that ID</p>
    </div>
  )
}

export default Letter