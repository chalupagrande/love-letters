import React, { useContext } from 'react'
import { Store } from '../store'
import Map from '../components/Map'

function Home() {
  let posts = useContext(Store)
  let locations = posts.map(c => ({lat: c.latitude, lng: c.longitude, id: c.id}))
  return (
    <div className="page">
      <Map locations={locations} />
    </div>
  )
}

export default Home