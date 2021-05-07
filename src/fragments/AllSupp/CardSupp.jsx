import React from 'react'
import { Link } from 'react-router-dom'

const CardSupp = ({ supplier }) => {
  return (
    <Link to={`/tiendas/${supplier.slug}`}>
      <div className="card p-3">
        <div className="card-block">
          <h4 className="card-title">{supplier.name}</h4>
          <h6 className="card-subtitle text-muted">{supplier.categ}</h6>
          <p className="card-text p-y-1">Some quick example text to build on the card title .</p>
          <a href="/#" className="card-link">link</a>
          <a href="/#" className="card-link">Second link</a>
        </div>
      </div>
    </Link>
  )
}

export default CardSupp
