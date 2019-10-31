import React, { Component } from 'react'

class Task extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description: props.task.description,
    }
  }

  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.props.task.id, this.state.description)
    }
  }

  manageTask () {
    const {task} = this.props
    if (task.persisted) {
      this.props.onDelete(task.id)
    } else {
      this.props.onSubmit(task.id, this.state.description)
    }
  }

  render() {
    const {persisted} = this.props.task
    return (
        <div
          className='task-box'
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
