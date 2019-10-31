import React from 'react'

const Column = ({ name, addTask, tasks }) => {
  return (
    <div className='Column vertical'>
      <div className='column-header'>
        <div className='column-name'>
          {name}
        </div>
        <div
          className='add-task-button'
          onClick={() => addTask(name)}
        >
          +
        </div>
      </div>
      <div className='column-body'>
        {tasks.map((task) => (
          <div
            className='task-box'
            key={task.id}
          >
            {task.description}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Column
