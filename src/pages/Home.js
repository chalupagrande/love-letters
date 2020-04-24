import React, { useContext, useEffect } from 'react'
import store from '../store'
import Map from '../components/Map'
import Modal from '../components/Modal'
import Letter from '../components/Letter'

function Home() {
  let state = useContext(store)
  const {posts, showModal, isMuted, location, setState} = state

  function handleClick(l) {
    setState({
      ...state,
      showModal: true,
      location: l
    })
  }

  function close(){
    setState({
      ...state,
      showModal: false,
      location: {}
    })
  }

  useEffect(()=> {
    function closeOnEscape(e){
      if(e.key === 'Escape') close()
    }
    document.addEventListener('keydown', closeOnEscape)
    return ()=> document.removeEventListener('keydown', closeOnEscape)
  })

  const audioUrl = location?.audio?.file?.publicUrl
  return (
    <>
    <Modal title={location.city} isVisible={showModal} onClose={close}>
        <Letter id={location.id}/>
      </Modal>
    <div className="page">
      <audio id="audio-element" src={audioUrl} autoPlay={true} loop={true} muted={isMuted || !audioUrl} />
      <Map locations={posts} onClick={handleClick}/>
    </div>
    </>
  )
}

export default Home