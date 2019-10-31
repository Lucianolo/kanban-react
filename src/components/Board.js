import React, { Component } from 'react'
import Column from './Column'
import Api from '../services/Api'

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
    console.log(e)
  }

  addTask (status) {
    if (this.state.editingTask) {
      this.displayErrors('Please save the previous task before adding a new one')
    } else {
      const {tasks} = this.state
      const nextId = tasks.length
      const task = {
        id: nextId,
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

  displayErrors (errorMessage) {
    this.setState({errors: errorMessage}, () => {
      setTimeout(() => {
        this.setState({errors: null})
      }, 2000)
    })
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
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Board
