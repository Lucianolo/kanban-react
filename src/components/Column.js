import React from 'react'
import Task from './Task'
import Draggable from './drag/Draggable'

const Column = ({ name, addTask, tasks, saveTask, deleteTask, displayErrors, editTask }) => {
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
          <Draggable
            dragId={task.id}
            key={index}
          >
            <Task
              task={task}
              onSubmit={saveTask}
              onDelete={deleteTask}
              displayErrors={displayErrors}
              editTask={editTask}
            />
          </Draggable>
        ))}
      </div>
    </div>
  )
}

export default Column
