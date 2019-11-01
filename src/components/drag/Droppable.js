import React from 'react'

const Droppable = ({ dropName, dropCallback, children }) => {

  const onDragOver = (ev) => {
    ev.preventDefault()
  }

  const onDrop = (e, callback, ...args) => {
    const id = e.dataTransfer.getData("id")
    callback(id, args)
  }

  return (
    <div
      className='droppable'
      onDragOver={(e)=> onDragOver(e)}
      onDrop={(e)=> onDrop(e, dropCallback, dropName)}
    >
      {children}
    </div>
  )
}

export default Droppable
