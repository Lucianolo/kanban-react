import React, { Component } from 'react'
import Column from './Column'

const TICKET_STATUSES = ['To-Do', 'In Progress', 'Done']

const MOCK_DATA = [
  {id: 1, status: 'To-Do', description: 'Do Something', persisted: true},
  {id: 2, status: 'To-Do', description: 'Do Something', persisted: true},
  {id: 3, status: 'To-Do', description: 'Do Something', persisted: true},
  {id: 4, status: 'In Progress', description: 'Doing something', persisted: true},
  {id: 5, status: 'Done', description: 'Did Something', persisted: true},
  {id: 6, status: 'To-Do', description: 'Do Something', persisted: true},
  {id: 7, status: 'To-Do', description: 'Do Something', persisted: true},
  {id: 8, status: 'Done', description: 'Did Something', persisted: true},
  {id: 9, status: 'In Progress', description: 'Doing something', persisted: true},
]
class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: MOCK_DATA
    }
  }

  addTask (status) {
    const task = {
      id: this.state.tasks[this.state.tasks.length - 1].id + 1,
      status: status,
      description: 'Add a description',
      persisted: false,
    }
    this.setState((state) => {
      return {
        tasks: [...state.tasks, task],
      }
    })
  }

  render() {
    return (
      <div className='Board'>
        <div className='heading'>
          (Mini)Kanban board
        </div>
        <div className='columns horizontal'>
          {TICKET_STATUSES.map((status, index) => (
            <Column
              addTask={this.addTask.bind(this)}
              name={status}
              key={index}
              tasks={this.state.tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Board
