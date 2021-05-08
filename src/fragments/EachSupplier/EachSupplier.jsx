import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneSupp } from '../../services/SuppService'
import ClipLoader from "react-spinners/ClipLoader";
import Map from './Map'
import './EachSupplier.scss'
import ProdsInSupp from "./ProdsInSupp";

const EachSupplier = () => {
  const [supp, setSupp] = useState();
  const [prods, setProds] = useState();
  const { slug } = useParams()

  useEffect(() => {
    getOneSupp(slug).then((supp) => {
      setSupp(supp)
      setProds(supp.products)
    });
  }, [slug]);

  if (!supp && !prods) {
    return (
    <div style={{height: 600}}>
    <div className="spinner-style"><ClipLoader color="#E15D45" />
    </div>
    </div>)
  }
  return (
    <div className="container p">
    <img src={supp.imgs} alt={supp.name} style={{width: 200}}/>
    <img src={supp.logo} alt={supp.name} style={{width: 50}}/>
      {supp?.name}
      {supp.type}
      {supp.bio}
      <div className="container">
        <ProdsInSupp prods={prods} />
      </div>
      {supp && <Map lon={Number(supp?.lat)} lat={Number(supp?.lon)}/>}
    </div>
  )
}

export default EachSupplier
