import { useState, useEffect } from 'react'
import { getAllProducts } from '../../services/ProductsService'
import './Products.scss'

const Products = () => {
  const [products, setProducts] = useState({})

  const getProducts = async () => {
    const allProducts = await getAllProducts()
    setProducts(allProducts)

  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="Products">
     {
       products.listProducts
        ? products.listProducts?.map((p) => <p>{p.name}</p>)
        : (
          <>
          <h1>YES SEND</h1>
            {
              products.yesSend?.map((p) => <p>{p.name}</p>)
            }
            <h1>NO SEND</h1>
            {
              products.noSend?.map((p) => <p>{p.name}</p>)
            }
          </>
        )
      }
    </div>
  )
}

export default Products
