import React from 'react'
import { AiOutlineShop } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './CardSupp.scss'

const CardSupp = ({ supplier }) => {
  return (
    <Link to={`/tiendas/${supplier.slug}`} className="text-decoration-none">
      <div className="card text-decoration-none">
        <img src={supplier.imgs} alt={supplier.name}/>
        <div className="card-block tiendas-card-bott text-decoration-none p-2">
          <h4 className="card-title"><AiOutlineShop />{supplier.name}</h4>
          <h6 className="card-subtitle text-muted">{supplier.categ}</h6>
        </div>
      </div>
    </Link>
  )
}

export default CardSupp
