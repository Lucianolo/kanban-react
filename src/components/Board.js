import React, { Component } from 'react'
import Column from './Column'
class Board extends Component {
  render() {
    return (
      <div className='Board'>
        <div className='heading'>
          (Mini)Kanban board
        </div>
        <div className='columns horizontal'>
          <Column name={'To-Do'}/>
          <Column name={'In Progress'}/>
          <Column name={'Done'}/>
        </div>
      </div>
    )
  }
}

export default Board
