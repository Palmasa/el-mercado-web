import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from '../../services/ProductsService'
import { cashConverter } from '../../helpers/priceConverter'
import './EachProduct.scss'

const EachProduct = () => {
  const [product, setProduct] = useState();
  const [supplier, setSupplier] = useState();
  const [ okTosend, setOkSend ] = useState();
  const { slug } = useParams()

  useEffect(() => {
    getOneProduct(slug).then((prod) => {
      setProduct(prod.product)
      setOkSend(prod.okToSend)
      setSupplier(prod.supplier)
    });
  }, [slug]);

  if (!product) {
    return "Loading...";
  }
  return (
    <div className="Product card" style={{ width: "18rem" }}>
      <img src={product.img[0]} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          {product.description}
          <br />
          {cashConverter(product.price)} €
        </p>
      </div>
      { okTosend ? <p>SI AL ENVIÓ</p> : <p>NO LLEGA</p>}
        {supplier?.name}
        {supplier?.ownerName}
        {supplier?.name}
        {supplier?.name}
    </div>
  );
}

export default EachProduct
