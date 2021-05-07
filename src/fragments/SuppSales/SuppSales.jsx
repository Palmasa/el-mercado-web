import { useState, useEffect } from 'react'
import { changeSaleSupp, doneSales, onGoingSales } from '../../services/SaleService'
import { cashConverter } from '../../helpers/priceConverter'

const STATES = [ 'Procesando', 'Cancelado', 'Preparando', 'Enviado', 'Entregado' ]

const SuppSales = () => {
  
  const [ currentSales, setCurrentSales ] = useState([])
  const [ done, setDoneSales ] = useState([])

  const getAllsales = () => {
    doneSales()
    .then((res) => {
        setDoneSales(res)
    })
    onGoingSales()
    .then((res) => {
      setCurrentSales(res)
  })
 }

 const changeState = (state, id) => {
   console.log(state, id)
  changeSaleSupp(id, {state, message: `El pedido ${id} ha sido ${state}.`})
  .then((res) => {
    console.log(res)
    getAllsales()
  })
 }
 
 useEffect(() => {
  getAllsales()
  }, [])

  return (
    <div>
      <h2>current</h2>
      {
        currentSales?.map((sale) => (
          <div key={sale.id} className="row border">
            <h1>{sale.state}</h1>
            <p>{sale.address.city}, {sale.address.street} {sale.address.number}, {sale.address.block}</p>
            {
              sale.products.map((p) => (
                <div key={p.id}>
                  <p>{p.name}</p>
                  <p>x0{p.quantity}</p>
                  <p>{cashConverter(p.price)}€</p>
                </div>
              ))
            }
            {
              STATES.map((s) => <button onClick={()=> changeState(s, sale.id)}>{s}</button>) 
            }
          </div>
        ))
      }
      <h2>DONE</h2>
      {
        done?.map((sale) => (
          <div key={sale.id} className="row border">
            <h1>{sale.state}</h1>
            <p>{sale.address.city}, {sale.address.street} {sale.address.number}, {sale.address.block}</p>
            {
              sale.products.map((p) => (
                <div key={p.id}>
                  <p>{p.name}</p>
                  <p>x0{p.quantity}</p>
                  <p>{cashConverter(p.price)}€</p>
                </div>
              ))
            }
            {/* <button onClick={() => cancelSale(sale.id)}>Cancelar</button> */}
          </div>
        ))
      }
    </div>
  )
}

export default SuppSales
