import React, { useContext } from 'react'
import store from '../store'
import Map from '../components/Map'

function Home() {
  let posts = useContext(store)
  let locations = posts.map(c => ({ lat: c.lat, lng: c.lng, id: c.id, city: c.city }))
  console.log(locations)
  return (
    <div className="page">
      <Map locations={locations} />
    </div>
  )
}

export default Home