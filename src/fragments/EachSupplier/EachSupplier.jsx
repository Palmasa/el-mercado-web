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
  const [loader, setLoader] = useState(true);
  const { slug } = useParams()

  useEffect(() => {
    getOneSupp(slug).then((supp) => {
      setSupp(supp)
      setProds(supp.products)
      setLoader(false)
    });
  }, [slug]);

  return (
    <>
    {
      loader
      ? (
        <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
        </div>
      ) : (

        <div className="container p-5">
          <div className="row">
            <div className="col-8">
            <div className="row w-100">
              <img className="img-fluid" src={supp.imgs} alt={supp.name} />
            </div>
              <img src={supp.logo} alt={supp.name} style={{width: 50}}/>
              {supp?.name}
              {supp.type}
              {supp.bio}
            </div>

            <div className="col">
            <div className="row justify-content-center aling-items-center">
              <div className="box-send-info p-3 text-center">
                <div className="img-owner">
                  <img src={supp.ownerImg} alt={supp.owner} className="circular-portrait"/>
                </div>
                <h4 className="mt-2">{supp.ownerName}</h4>
                <p>{supp.ownerBio}</p>
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              {supp && <Map lon={Number(supp?.lat)} lat={Number(supp?.lon)}/>}
              <p>{supp.address.street} {supp.address.number}, {supp.address.city}</p>
            </div>
            </div>
          </div>

          <div className="row my-5">
            <ProdsInSupp prods={prods} />
          </div>
        </div>
      )
      
    }
    </>
  )
}

export default EachSupplier
