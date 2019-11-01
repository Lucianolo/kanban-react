import React, { Component } from 'react'
import Column from './Column'
import Api from '../services/Api'

// In case we want to add Statuses in the future, it's enough to add it to this array
const TICKET_STATUSES = ['To-Do', 'In Progress', 'Done']

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      editingTask: false,
      errors: null,
    }
  }

  componentDidMount() {
    Api.getTasks()
      .then(this.onGetTasksSuccess.bind(this))
      .catch(this.onGetTasksFailure)
  }

  onGetTasksSuccess (data) {
    const tasks = data || []
    this.setState({tasks})
  }

  onGetTasksFailure (e) {
    this.displayErrors(e.name + ': ' + e.message)
  }

  // Creates an empty task (Not persisted, only present in State
  addTask (status) {
    if (this.state.editingTask) {
      this.displayErrors('Please save the previous task before adding a new one')
    } else {
      const task = {
        id: this.state.tasks.length,
        status: status,
        description: '',
        persisted: false,
      }
      this.setState((state) => {
        return {
          tasks: [...state.tasks, task],
          editingTask: true,
        }
      })
    }
  }

  // Saves the task as persisted, sets its description and updates localstorage
  saveTask (taskId, description) {
    const newTasks = [...this.state.tasks]
    const currentTask = newTasks.find((task) => {return task.id === taskId})
    currentTask.description = description
    currentTask.persisted = true
    this.setState(() => {
      return {
        tasks: newTasks,
        editingTask: false,
      }
    }, () => {
      Api.setTasks(this.state.tasks.filter((task) => task.persisted))
    })
  }

  // Deletes a task by id, updates localstorage
  deleteTask (taskId) {
    const newTasks = this.state.tasks.filter((task) => {return task.id !== taskId})
    this.setState(() => {
      return {
        tasks: newTasks
      }
    }, () => {
      Api.setTasks(this.state.tasks.filter((task) => task.persisted))
    })
  }

  // Given an error string, displays an error message for 2 seconds
  displayErrors (errorMessage) {
    this.setState({errors: errorMessage}, () => {
      setTimeout(() => {
        this.setState({errors: null})
      }, 2000)
    })
  }

  editTask (id) {
    let tasks = this.state.tasks.filter((task) => {
      if (task.id === id) {
        task.persisted = false
      }
      return task
    })
    this.setState({
      ...this.state,
      tasks
    });
  }

  render() {
    return (
      <div className='Board'>
        <div className='heading'>
          (Mini)Kanban board
        </div>
        {this.state.errors &&
          <div className='errors'>
            {this.state.errors}
          </div>
        }
        <div className='columns horizontal'>
          {TICKET_STATUSES.map((status, index) => (
            <Column
              addTask={this.addTask.bind(this)}
              name={status}
              key={index}
              tasks={this.state.tasks.filter((task) => task.status === status)}
              saveTask={this.saveTask.bind(this)}
              deleteTask={this.deleteTask.bind(this)}
              displayErrors={this.displayErrors.bind(this)}
              editTask={this.editTask.bind(this)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Board
