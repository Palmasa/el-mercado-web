import React from 'react'
import { AiOutlineShop } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './CardSupp.scss'

const CardSupp = ({ supplier }) => {
  return (
    <Link to={`/tiendas/${supplier.slug}`} className="text-decoration-none complete-card">
      <div className="container text-decoration-none h-100 complete-card">
        <div className="container-img complete-card">
          <img src={supplier.imgs} alt={supplier.name} className={`img-card`}/>
        </div>
        <div className="card-block tiendas-card-bott text-decoration-none p-2">
          <h4 className="card-title"><AiOutlineShop />{supplier.name}</h4>
          <h6 className="card-subtitle text-muted">{supplier.categ}</h6>
        </div>
      </div>
    </Link>
  )
}

export default CardSupp
