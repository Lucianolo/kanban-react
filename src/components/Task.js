import React, { Component } from 'react'

class Task extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description: props.task.description,
    }
  }

  // Trigger saving the task when enter is pressed
  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.onSubmit(this.props.task.id)
    }
  }

  // Handles clicks on delete and save
  manageTask () {
    const {task} = this.props
    if (task.persisted) {
      this.props.onDelete(task.id)
    } else {
      this.onSubmit(task.id)
    }
  }

  // Proxy to props.submit, used to make sure description is filled,
  // if not, displays an error.
  onSubmit (taskId) {
    if (this.state.description.length) {
      this.props.onSubmit(taskId, this.state.description)
    } else {
      this.props.displayErrors("Task Description can't be blank")
    }
  }

  render() {
    const {persisted, id} = this.props.task
    return (
        <div
          className='task-box'
          onDoubleClick={() => this.props.editTask(id)}
        >
          { persisted ?
            this.state.description :
            <input
              value={this.state.description}
              placeholder='Add a description'
              onKeyDown={this.onKeyDown.bind(this)}
              onChange={(e) => {
                this.setState({description: e.target.value})
              }}
            />
          }
          <button
            type='button'
            title={persisted ? 'Delete' : 'Save'}
            className={`action-button ${persisted ? 'delete-button' : 'save-button'}`}
            onClick={this.manageTask.bind(this)}
          >
            {persisted ? 'X' : '✓'}
          </button>
        </div>

    )
  }
}

export default Task
