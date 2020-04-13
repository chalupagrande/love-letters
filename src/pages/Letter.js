import React from 'react'
import {useParams} from 'react-router-dom'

function Letter() {
  let {id} = useParams()
  return (
    <div className="page">
      <h1>Letter: {id}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus recusandae harum ea tempora officiis assumenda totam quia libero ipsam ex autem quae tempore itaque, aspernatur consequatur debitis facere illum dolores!</p>
    </div>
  )
}

export default Letter