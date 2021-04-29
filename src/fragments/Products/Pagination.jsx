import React from 'react'

const Pagination = ({ prodPerPage, totalProd, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i<= Math.ceil(totalProd / prodPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
    {pageNumbers.map((n) => (
      <li key={n} className='page-item'>
        <button onClick={()=> paginate(n)} href="!#" className="page-link">{n}</button>
      </li>
    ))}
      </ul>
    </nav>
  )
}

export default Pagination
