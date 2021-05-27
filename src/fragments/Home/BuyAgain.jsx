import { useEffect, useState, useContext, useCallback } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { getBuyAgain } from '../../services/RecommendService'
import { UserContext } from '../../contexts/UserContext'
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../Products/ProductCard'

const BuyAgain = () => {
  const { user } = useContext(UserContext)
  const [ loading, setLoading] = useState(true)
  const [ clientBuyAgain, setBuyAgain ] = useState([])

  const buyAgain = useCallback(
    () => {
    getBuyAgain(user?.id)
    .then((buy) => {
      setBuyAgain(buy)
    })

  }, [ user ]
  )

  useEffect(() => {
    buyAgain()
    setLoading(false)
  }, [ buyAgain ])

  return (
    <>
        <div className="row heather-home p-4">
        <div className="container-fluid mx-5">
          <div className="row mb-4">
            <h4 className="mx-5 px-5">Vuelve a comprar</h4>
          </div>
          <div className="row justify-content-center">
          {
            loading
            ? <div style={{ height: 300}}>
              <div className="home-spinner"><ClipLoader color="#E15D45" /></div>
            </div>
            : (
            <Carousel>
              {
                clientBuyAgain?.map((product) => (
                  <div key={product.id} className="mr-5">
                    <ProductCard product={product} />
                  </div>
                ))
              }
            </Carousel>
          )
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default BuyAgain
