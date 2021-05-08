import { useEffect, useState } from 'react'
import { getUserSales } from '../../services/UsersService'
import { userCancelSale } from '../../services/SaleService'
import { cashConverter } from '../../helpers/priceConverter'
import ClipLoader from "react-spinners/ClipLoader";
import './Orders.scss'
const Orders = () => {
  const [ sales, setSales ] = useState([])
  const [ loader, setLoader ] = useState(true)

  const getSales = async () => {
    try {
      const allSales = await getUserSales()
      setSales(allSales)
      setLoader(false)
    } catch(e) { console.log(e.response.data)}
  }

  const cancelSale = (id) => {
    setLoader(true)
    userCancelSale(id)
    .then((res) => {
      setLoader(false)
    })
  }

  const paintState = (state) => {
    if (state === 'Entregado') {
      return (<h6 className="text-right" style={{color: 'green'}}>{state}</h6>)
    } else if (state === 'Cancelado') {
      return (<h6 className="text-right" style={{color: 'red'}}>{state}</h6>)
    } else {
      return (<h6 className="text-right"><i>{state}</i></h6>)
    }
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <>
      {
        loader
        ? (
          <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
          </div>
        ) : (
          <div className="container">
          <div className="row justify-content-center">
            {
              sales?.map((sale) => (
                <div key={sale.id} className="col-md-6 mb-3 ml-3 box-pay-info p-4">
                <div className="row justify-content-center border-bottom mb-2">
                  <h4><b>{sale.products[0].supplier}</b></h4>
                </div>
                <div className="">
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
                <div className="row justify-content-center align-items-center">
                  <p><small>Envío a: {sale.address.street} {sale.address.number}</small></p>
                </div>
                <div className="row align-items-center border-top pt-2">
                  <div className="col">
                    {
                      sale.state !== 'Cancelado' && <button 
                        className="cancelar-users-order"
                        onClick={() => cancelSale(sale.id)}
                        >
                          <small>Cancelar</small>
                        </button>
                    }
                  </div>
                  <div className="col">
                    {paintState(sale.state)}
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

export default Orders