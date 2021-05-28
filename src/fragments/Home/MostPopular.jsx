import { useEffect, useState } from 'react'
import { getBestSellers } from '../../services/RecommendService'
import ClipLoader from "react-spinners/ClipLoader";
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../Products/ProductCard'
import { AiTwotoneThunderbolt } from 'react-icons/ai'
import { renameKey } from '../../helpers/renameKeysObj'

const MostPopular = () => {
  const [ loading, setLoading] = useState(true)
  const [ bestSellers, setBestSellers ] = useState()

  const mostPopular = async () => {
    const p = await getBestSellers()
    console.log(p)
     let topTen = p.resolveProducts?.slice(0, 10)
     if (p?.resolvedProductsZip) {
      let allP = p.resolvedProductsZip?.map((p) => ({...p._doc, noSend: p.noSend}))
      topTen = allP.map((p) => renameKey(p, '_id', 'id')).slice(0, 11)
    }
    setBestSellers(topTen)
    setLoading(false)
  }

  useEffect(() => {
    mostPopular()
  }, [])

  return (
    <>
      <div className="row heather-home p-4">
        <div className="container-fluid mx-5">
          <div className="row my-4">
            <h4 className="mx-5 px-5"><AiTwotoneThunderbolt /> Los más vendidos</h4>
          </div>
          <div className="row justify-content-center">
          {
            loading
            ? (<div className="mt-5" style={{ height: 272}}>
                <div className="mt-5"></div>
                <div className="home-spinner"><ClipLoader color="#E15D45" /></div>
              </div>
            ) : (
              <Carousel id="bestSeller">
                {
                  bestSellers?.map((bestSeller, i) => (
                    <div key={bestSeller.id} className="mr-5">
                      <ProductCard product={bestSeller} bestSeller={i + 1}/>
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

export default MostPopular
