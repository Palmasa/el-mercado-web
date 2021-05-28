import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { createAddCart } from '../../services/CartService'
import { setCart } from '../../store/cartStore'
import { cashConverter } from '../../helpers/priceConverter'
import { BsPlus } from 'react-icons/bs'
import { AiFillThunderbolt } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import './ProductCard.scss'

const notify = (value) => toast( value + ' añadido a la bolsa');
const negNotify =  (value) => toast( value );


const ProductDetail = ({ product, bestSeller, noOrganic }) => {
  const { setStateCart } = useContext(CartContext)
  
  const addItem = () => {
    createAddCart(product.id) // petición al back
    .then((cart) => {
      if (cart.newCart) { // || localStorage.getItem('cart') !== null
        setCart(cart.cart.id)
      }
      setStateCart(cart.cart) // el carrito entero y tengo acceso a el desde cualquier parte
      notify(product.name)
    })
    .catch((error) => {
      console.log(error.response?.data)
      console.log(`productCart. error -> ${error.response?.data?.errors?.zip}`)
      negNotify('Se necesita introducir un código postal')
    })
  }

  return (
    <div className="container card-product pb-3 items-carousel">
    <Link to={`/productos/${product.slug}`}>
    { noOrganic && product.isBoosted && (
      <div className="boosted-product text-center">
        <p><small>Patrocinado</small></p>
      </div>
      
      ) }
    { bestSeller && bestSeller <= 12 && (
      <IconContext.Provider value={{ color: "E15D45", className: "icon-thunder" }}>
        <div className="tag-product text-center">
          <p><AiFillThunderbolt /></p>
        </div>
      </IconContext.Provider>
    )}
    <div className="row justify-content-center mb-2 container-img">
        <img src={product.img[0]} alt={product.name} className={`img-card ${product.noSend ? "bw" : ''}`}/>
    </div>
    </Link>
    <div className="row info-card-product-mini">
      <Toaster />
      <div className="col-9 align-items-center">
    <Link to={`/productos/${product.slug}`} className="text-decoration-none align-items-center">
        <div className="row justify-content-start pl-2">
          <p className="text-card name-of-product">{product.name}</p>
        </div>
        <div className="row justify-content-start pl-2">
          <p className="money-card">{cashConverter(product.price)}€ / {product.measure}</p>
        </div>
    </Link>
      </div>
      <div className="col justify-content-end text-right pr-2">
        {
          product.noSend
          ? <button className="add-button-card-cart" disabled={true}><BsPlus/></button>
          : <button className="add-button-card-cart" onClick={addItem}><BsPlus/></button>
        }
      </div>
    </div>
    </div>
  )
}

export default ProductDetail
