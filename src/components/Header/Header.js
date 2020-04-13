import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header className="header">
      <div>
        <Link className="link" to="/donte">Home</Link>
        <Link className="link" to="/about">About</Link>
      </div>
      <h1 className="title">Love Letters</h1>
      <Link className="link" to="/donate">Donate</Link>
    </header>
  )
}

export default Header