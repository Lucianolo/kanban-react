import React from 'react'

const Column = ({ name }) => {
  return (
    <div className='Column vertical'>
      <div className='column-name'>
        {name}
      </div>
    </div>
  )
}

export default Column
