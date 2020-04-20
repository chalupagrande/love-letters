import React, { useContext } from 'react'
import store from '../store'
import ReactHTMLParser from 'react-html-parser'
import '../styles/About.css'

function About() {
  const pages = useContext(store).pages
  const aboutPage = pages.find(p => p.name === 'About')
  if (!aboutPage) return <h1>About</h1>
  const { content, photo } = aboutPage
  console.log(content)
  return (
    <div className="page about">
      <div className="content">
        {photo && photo.file && <img className="photo" src={photo.file.publicUrl} alt="About" />}
        <div className="words">
          <h1>About</h1>
          {ReactHTMLParser(content)}
        </div>
      </div>
    </div>
  )
}

export default About