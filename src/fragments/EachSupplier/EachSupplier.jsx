import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneSupp } from '../../services/SuppService'
import Map from './Map'
import './EachSupplier.scss'

const EachSupplier = () => {
  const [supp, setSupp] = useState();
  const { slug } = useParams()

  useEffect(() => {
    getOneSupp(slug).then((supp) => {
      setSupp(supp)
      console.log(supp)
    });
  }, [slug]);

  return (
    <div>
      {supp?.name}
      {supp && <Map lon={Number(supp?.lat)} lat={Number(supp?.lon)}/>}
    </div>
  )
}

export default EachSupplier
