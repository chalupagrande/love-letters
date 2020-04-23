import React, { useContext } from 'react'
import store from '../store'
import ReactHTMLParser from 'react-html-parser'
import '../styles/Donate.css'
import Footer from '../components/Footer'

function Donate() {
  const pages = useContext(store).pages
  const donate = pages.find(p => p.name === 'Donate')
  if (!donate) return <h1>Donate</h1>
  const { content } = donate
  return (
    <div className="page donate">
      <div className="content">
        <h1>Donate</h1>
        {ReactHTMLParser(content)}
      </div>
      <Footer/>
    </div>
  )
}

export default Donate