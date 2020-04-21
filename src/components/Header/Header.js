import React, { useContext } from 'react'
import store from '../../store'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  let state = useContext(store)
  const { isMuted, setState } = state
  console.log(state)

  function toggleMute() {
    setState({ ...state, isMuted: !isMuted })
  }

  return (
    <header className="header">
      <Link className="link header__item header__item--left" to="/about">About</Link>
      <Link className="link header__item" to="/"><h1 className="title">Love Letters</h1></Link>
      <div className="header__item header__item--right">
        <div onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</div>
        <Link className="link" to="/donate">Donate</Link>
      </div>
    </header>
  )
}

export default Header