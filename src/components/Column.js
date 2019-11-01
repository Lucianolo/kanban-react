import React from 'react'
import Task from './Task'
import Draggable from './drag/Draggable'

const Column = ({ name, addTask, tasks, saveTask, deleteTask, displayErrors, editTask }) => {
  return (
    <>
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
          <Draggable
            dragId={task.id}
            key={task.id}
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
    </>
  )
}

export default Column
