import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneSupp } from '../../services/SuppService'
import ClipLoader from "react-spinners/ClipLoader";
import Boosted from "../Home/Boosted";
import Map from './Map'
import './EachSupplier.scss'
import ProductCard from '../Products/ProductCard'

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
            <div className="row mb-4">
              <div className="box-supp-img">
                <img src={supp.imgs} alt={supp.name} />
              </div>
            </div>
          <div className="row">
            <div className="col-7">
            <div className="container">
            <div className="row justify-content-start align-items-center mb-4">
              <img src={supp.logo} alt={supp.name} style={{width: 85}}/>
              <h1 className="ml-3">{supp?.name}</h1>
            </div>
              <p style={{fontSize: "18px"}}>{supp.bio}</p> 
            </div>

            <div className="row justify-content-center border-bottom mt-5">
              <h3>Productos</h3>
            </div>
            <div className="row my-5">
              <div className="container mb-2 products-scroll">
                {prods?.map((product) => (
                  <div className="mr-4">
                    <ProductCard
                    key={product.id}
                    className="keen-slider__slide"
                    product= {product}
                    />
                  </div>
                 ))}
              </div>
            </div>
          </div>

            <div className="col">
            <div className="container">
              <div className="row justify-content-center aling-items-center">
                <div className="box-owner-info p-3 text-center">
                  <div className="img-owner">
                    <img src={supp.ownerImg} alt={supp.owner} className="circular-portrait"/>
                  </div>
                  <h4 className="mt-3 mb-0">{supp.ownerName}</h4>
                  <p style={{marginBottom: 0}}> {supp.type} - {supp.categ}</p>
                  <p className="mt-3"><i>{supp.ownerBio}</i></p>
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                {supp && <Map lon={Number(supp?.lat)} lat={Number(supp?.lon)}/>}
              </div>
              <div className="row justify-content-center align-items-center">
                <p>{supp.address.street} {supp.address.number}, {supp.address.city}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      )
      
    }
      <div className="">
          <Boosted color="#fff" text="También te puede interesar"/>
      </div>
    </>
  )
}

export default EachSupplier
