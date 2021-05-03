import { useContext, useEffect, useState } from 'react'
import { SuppContext } from '../../contexts/SuppContext'
import { getAllShippings } from '../../services/SuppService.js'

const ShippingInfo = () => {
  const { supp } = useContext(SuppContext)
  const [ shippings, setShippings ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    getAllShippings()
    .then(res => {
      setShippings(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="container p-4">
    <div className="row">
      <h2>{supp?.name}</h2>
      <h2>MODELOS DE ENVÍO</h2>
    </div>
      {
        loading
        ? <p>Loading</p>
        : (
          <div>
          {
            shippings.map((shipping) => (
            <div className="row" key={Math.ceil(Math.random() * 1000)}>
              <h5>{shipping.name}</h5>
              <h5>{shipping.shipping[0].sendPrice}€</h5>
              <h5>{shipping.shipping[0].sendDisccount}€</h5>
              <h5>{shipping.shipping[0].sendTime}</h5>
              {/*
              <button> Provincias </button>
              <div>
                {shipping.shipping.map((p) => (
                <div className="col" key={p.province}>
                  <p>{p.province}</p>
                </div>
              ))} 
              </div>
              */}
            </div>
          ))
          }
          </div>
        )
      }
    </div>
  )
}

export default ShippingInfo
