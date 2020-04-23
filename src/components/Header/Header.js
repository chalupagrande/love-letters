import React, { useContext } from 'react'
import store from '../../store'
import './Header.css'
import { Link } from 'react-router-dom'
import Muted from '../../assets/images/muted.svg'
import Sound from '../../assets/images/sound.svg'


function Header() {
  let state = useContext(store)
  const { location, isMuted, setState } = state
  console.log(state)

  function toggleMute() {
    setState({ ...state, isMuted: !isMuted })
  }

  return (
    <header className="header">
      <Link className="link header__item header__item--left" to="/about">About</Link>
      <Link className="link header__item" to="/"><h1 className="title">Love Letters</h1></Link>
      <div className="header__item header__item--right">
        {(location.audio || isMuted) && <MuteUnmuteIcon isMuted={isMuted} onClick={toggleMute}/>}
        <Link className="link" to="/donate">Donate</Link>
      </div>
    </header>
  )
}

function MuteUnmuteIcon({isMuted, onClick}){
  if(isMuted) return <img className="mute-btn" src={Muted} onClick={onClick} alt="muted"/>
  else return <img className="mute-btn" src={Sound} onClick={onClick} alt="muted"/>
}

export default Header