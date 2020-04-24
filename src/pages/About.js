import React, { useContext } from 'react'
import store from '../store'
import ReactHTMLParser from 'react-html-parser'
import '../styles/About.css'

function About() {
  const pages = useContext(store).pages
  const aboutPage = pages.find(p => p.name === 'About')
  if (!aboutPage) return <h1>About</h1>
  const { content, photo } = aboutPage
  return (
    <div className="page about">
      <div className="photo">
        {photo && photo.file && <img src={photo.file.publicUrl} alt="About" />}
      </div>
      <div className="words">
        <div>
          <h1>About</h1>
          {ReactHTMLParser(content)}
        </div>
      </div>
    </div>
  )
}

export default About