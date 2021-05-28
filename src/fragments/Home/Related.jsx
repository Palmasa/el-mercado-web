import { useState, useEffect, useCallback } from 'react'
import { getRecommendRelated } from '../../services/RecommendService'
import ClipLoader from "react-spinners/ClipLoader";
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../Products/ProductCard'

const Related = ({ color, categ }) => {
  const [ loading, setLoading] = useState(true)
  const [ prods, setProds ] = useState()

  const getP = useCallback(
    () => {
    getRecommendRelated(categ)
    .then((p) => {
      setProds(p)
    })
  }, [ categ ]
  )

  useEffect(() => {
    getP()
    setLoading(false)
  }, [getP])

  return (
    <>
        <div className="row heather-home p-4">
          <div className="container-fluid px-5" style={{backgroundColor: `${color}`}}>
            <div className="row my-4">
              <h4 className="mx-5 px-5"> Productos relacionados </h4>
            </div>
            <div className="row justify-content-center pb-5">
            {
            loading
            ? (<div className="mt-5" style={{ height: 300}}>
                <div className="home-spinner"><ClipLoader color="#E15D45" /></div>
              </div>

            ) : (
              <>
                <Carousel>
                  {
                    prods?.map((bestSeller) => (
                      <div key={bestSeller.id} className="mr-5">
                        <ProductCard product={bestSeller} noOrganic={true}/>
                      </div>
                    ))
                  }
                </Carousel>
              </>
            )
            }
            </div>
            <div className="row"></div>
          </div>
        </div>
    </>
  )
}

export default Related