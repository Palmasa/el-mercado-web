import './ProductDetail.scss'

const ProductDetail = ({ product }) => {
  return (
    <div>
      <p>{product.name}</p>
      <button>Añadir al carrito</button>
      <button>Vista rápida</button>
    </div>
  )
}

export default ProductDetail
