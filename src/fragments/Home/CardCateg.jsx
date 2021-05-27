import { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import Carousel from '../../components/Carousel/Carousel.jsx'
import { allCategs } from '../../helpers/allCategs.js'
import aceites from '../../images/categs/aceites.png'
import cafes from '../../images/categs/cafes.png'
import carnes from '../../images/categs/carnes.png'
import charc from '../../images/categs/charc.png'
import conservas from '../../images/categs/conservas.png'
import hort from '../../images/categs/hort.png'
import dulces from '../../images/categs/dulces.png'
import ibericos from '../../images/categs/ibericos.png'
import quesos from '../../images/categs/quesos.png'
import './CardCateg.scss'

const imgs = [ aceites, cafes, carnes, charc, conservas, hort, dulces, ibericos, quesos ]

const CardCateg = () => {
  const [ mainCategs, setMain ] = useState([])
  const [param, setParam] = useState('')
  const [redirect, setRedirect] = useState(false)

  const getProducts = (i) => {
    setParam(i)
    setRedirect(true)
  }
  const paintCategs = () => {
    const main = Object.keys(allCategs).slice(0, 9)
    setMain(main)
  }
  useEffect(() => {
    paintCategs()
  }, [])

  return (
    <div className="row heather-home p-4">
        <div className="container-fluid mx-5">
          <div className="row mb-3">
            <h4 className="mx-5 px-5">Compra por categorías</h4>
          </div>
          <div className="row justify-content-center">
            <Carousel>
            {
              mainCategs?.map((main, i) => (
                <div key={i} className="Card-categ container">
                  <img src={imgs[i]} alt={main} onClick={() => getProducts(i)}/>
                  <button className="each-card-categ" onClick={() => getProducts(i)}>{main}</button>
                </div>
              ))
            }
            </Carousel>
          </div>
        </div>
        { redirect && (<Redirect to={`/productos?categoria=${param}`}/>)}
      </div>
  )
}

export default CardCateg
