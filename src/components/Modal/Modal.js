import React from 'react'
import './Modal.css'

function Modal(props) {
  const { title, onClose, children, isVisible } = props
  return (
    <div className="modal-container" style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header__title">{title || ''}</div>
          <div className="modal__header__close" onClick={onClose}>+</div>
        </div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal