import React from 'react'

/**
 *
 * @param children:Components
 * @param dragId:[String|Number] that will be assigned as id to the drag event
 * @returns The Children wrapped in a draggable component
 *
 */
const Draggable = ({ children, dragId }) => {

  const onDragStart = (ev, dragId) => {
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
