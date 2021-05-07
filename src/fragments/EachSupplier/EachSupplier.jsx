import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneSupp } from '../../services/SuppService'
import Map from './Map'
import './EachSupplier.scss'

const EachSupplier = () => {
  const [supp, setSupp] = useState();
  const [prods, setProds] = useState();
  const { slug } = useParams()

  useEffect(() => {
    getOneSupp(slug).then((supp) => {
      setSupp(supp)
      setProds(supp.products)
      console.log(supp.products)
    });
  }, [slug]);

  return (
    <div>
      {supp?.name}
      {
        prods?.map((p) => <p>{p.name}</p>)
      }
      {supp && <Map lon={Number(supp?.lat)} lat={Number(supp?.lon)}/>}
    </div>
  )
}

export default EachSupplier
