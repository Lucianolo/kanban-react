import React from 'react'
import Task from './Task'

const Column = ({ name, addTask, tasks, saveTask, deleteTask, displayErrors }) => {
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
        {tasks.map((task, index) => (
          <Task
            task={task}
            key={index}
            onSubmit={saveTask}
            onDelete={deleteTask}
            displayErrors={displayErrors}
          />
        ))}
      </div>
    </div>
  )
}

export default Column
