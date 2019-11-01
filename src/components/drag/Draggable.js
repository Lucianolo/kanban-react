import React from 'react'

const Draggable = ({ children, dragId }) => {

  const onDragStart = (ev, dragId) => {
    console.log(dragId)
    ev.dataTransfer.setData("id", dragId)
  }

  return (
    <div
      className='draggable'
      draggable
      onDragStart = {(e) => onDragStart(e, dragId)}
    >
      {children}
    </div>
  )
}

export default Draggable
