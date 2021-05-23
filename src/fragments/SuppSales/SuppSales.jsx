import { useState, useEffect } from 'react'
import { changeSaleSupp, doneSales, onGoingSales } from '../../services/SaleService'
import { cashConverter } from '../../helpers/priceConverter'
import ClipLoader from "react-spinners/ClipLoader";
import './SuppSales.scss'
const STATES = [ 'Procesando', 'Cancelado', 'Preparando', 'Enviado', 'Entregado' ]

const SuppSales = () => {
  const [ currentSales, setCurrentSales ] = useState([])
  const [ done, setDoneSales ] = useState([])
  const [loader, setLoader] = useState(true);

  const getAllsales = () => {
    doneSales()
    .then((res) => {
        setDoneSales(res)
    })
    onGoingSales()
    .then((res) => {
      setCurrentSales(res)
      setLoader(false)
  })
 }

 const changeState = (state, id) => {
  changeSaleSupp(id, {state, message: `El pedido ${id} ha sido ${state}.`})
  .then(() => {
    getAllsales()
  })
 }
 
 useEffect(() => {
  getAllsales()
  }, [])

  return (
    <>
      { loader
      ? (
        <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
        </div>
      ) : (

      <div className="container py-3">
        <div className="row">
          <h2 style={{color: '#E15D45'}}>Pedidos en curso</h2>
        </div> 
        <div className="row">
              {
                currentSales?.map((sale) => (
                  <div className="container card px-5 py-4 mb-4">
                  <div className="row border-bottom mb-3 justify-content-between">
                  <div className="col">
                    <h4>Nº {sale.id.slice(0, 4)}{sale.id.slice(22)}</h4>
                  </div>
                  <div className="col">
                    <div className="container">
                      <div key={sale.id} className="row justify-content-between align-items-center mb-2">
                        {
                          STATES.map((s) => (
                            <button
                              onClick={()=> changeState(s, sale.id)}
                              className={`states-suppliers ${sale.state === s && `${sale.state}`}`}
                            >
                            {s}
                            </button>
                          )) 
                        }
                      </div>
                    </div>
                  </div>
                  </div>

                  <div key={sale.id} className="row justify-content-between align-items-center mt-3 mb-2">
                    <div className="col">
                      <p>{sale.address.city}, {sale.address.street} {sale.address.number}, {sale.address.block}</p>
                    </div>
                    <div className="col">
                      <div className="container">
                      {
                          sale.products.map((p) => (
                            <div key={p.id} className="row">
                              <div className="col-6"><p>{p.name}</p></div>
                              <div className="col"><p> x0{p.quantity}</p></div>
                              <div className="col"><p>{cashConverter(p.price)} €</p></div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  </div>
                ))
              }
        </div>
        <div className="row mt-5">
          <h2 style={{color: '#E15D45'}}>Pedios finalizados</h2>
        </div>
        <div className="row">
              {
                done?.map((sale) => (
                  <div className="container card px-5 py-4 mb-4">
                  <div className="row border-bottom mb-3 justify-content-between">
                  <div className="col">
                    <h4>Nº {sale.id.slice(0, 4)}{sale.id.slice(22)}</h4>
                  </div>
                  <div className="col">
                    <div className="container">
                      <div key={sale.id} className="row justify-content-between align-items-center mb-2">
                        {
                          STATES.map((s) => (
                            <button
                              onClick={()=> changeState(s, sale.id)}
                              className={`states-suppliers ${sale.state === s && `${sale.state}`}`}
                            >
                            {s}
                            </button>
                          )) 
                        }
                      </div>
                    </div>
                  </div>
                  </div>

                  <div key={sale.id} className="row justify-content-between align-items-center mt-3 mb-2">
                    <div className="col">
                      <p>{sale.address.city}, {sale.address.street} {sale.address.number}, {sale.address.block}</p>
                    </div>
                    <div className="col">
                      <div className="container">
                      {
                          sale.products.map((p) => (
                            <div key={p.id} className="row">
                              <div className="col-6"><p>{p.name}</p></div>
                              <div className="col"><p> x0{p.quantity}</p></div>
                              <div className="col"><p>{cashConverter(p.price)} €</p></div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  </div>
                ))
              }
        </div>
      </div>
      )
    }
    </>
  )
}

export default SuppSales
