import { useState, useEffect, useContext } from 'react'
import { getProductsBoosted, getNotBoosted } from '../../services/ProductsService'
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from '../../contexts/UserContext'
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../Products/ProductCard'

const Boosted = ({ color, text }) => {
  const { user } = useContext(UserContext)
  const [ loading, setLoading] = useState(true)
  const [ boosted, setBoosted ] = useState()

  const getBoosted = async() => {
    const boost = await getProductsBoosted()
    const normal = await getNotBoosted()
    let allP
    if (!normal.listProducts) {
      if (normal.yesSend && normal.noSend) {
        allP = [ ...normal.yesSend ].sort(() => Math.random() - 0.5).slice(0, 7)
      }
    } else {
      allP = normal?.listProducts?.sort(() => Math.random() - 0.5).slice(0, 8)
    }
    let boost2 = boost.slice(0, 3)
    const toRecommend = [ ...allP, ...boost2 ].sort(() => Math.random() - 0.5)
    setBoosted(toRecommend)
  }

  useEffect(() => {
    getBoosted()
    setLoading(false)
  }, [])

  return (
    <>
        <div className="row heather-home p-4">
          <div className="container-fluid px-5" style={{backgroundColor: `${color}`}}>
            <div className="row my-4">
              {
                user
                ? <h4 className="mx-5 px-5"> {text}</h4>
                : <h4 className="mx-5 px-5"> Recomendados </h4>
              }
            </div>
            <div className="row justify-content-center pb-5">
            {
            loading
            ? (<div className="mt-5" style={{ height: 300}}>
                <div className="home-spinner"><ClipLoader color="#E15D45" /></div>
              </div>

            ) : (
            <Carousel>
              {
                boosted?.map((bestSeller) => (
                  <div key={bestSeller.id} className="mr-5">
                    <ProductCard product={bestSeller} noOrganic={true}/>
                  </div>
                ))
              }
            </Carousel>
            )
            }
            </div>
            <div className="row"></div>
          </div>
        </div>
        )
    </>
  )
}

export default Boosted
