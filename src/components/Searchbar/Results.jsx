import React from 'react'

const Results = ({ products }) => {

  return (
    <div style={{backgroundColor: 'blue', width: 300}}>
      <p>{products[0]}</p>
    </div>
  )
}

export default Results
