import './Pagination.scss'

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
        <button onClick={()=> paginate(n)} href="!#" className="number-page">{n}</button>
      </li>
    ))}
      </ul>
    </nav>
  )
}

export default Pagination
