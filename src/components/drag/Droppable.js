import React from 'react'

/**
 *
 * @param children:Components
 * @param dropName:String value to used by the callback to identify the drop target
 * @param classNames:String classes that belong to the droppable area, used to mantain consistent design
 * @param dropCallback:Function to be called on drop event, passing the event id and the other passed params
 * @returns The Children wrapped in a draggable component
 *
 */
const Droppable = ({ dropName, dropCallback, children, classNames }) => {

  const onDragOver = (ev) => {
    ev.preventDefault()
  }

  const onDrop = (e, callback, ...args) => {
    const id = e.dataTransfer.getData("id")
    callback(id, args)
  }

  return (
    <div
      className={`droppable ${classNames}`}
      onDragOver={(e)=> onDragOver(e)}
      onDrop={(e)=> onDrop(e, dropCallback, dropName)}
    >
      {children}
    </div>
  )
}

export default Droppable
