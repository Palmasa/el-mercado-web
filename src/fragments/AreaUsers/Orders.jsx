import { useEffect, useState, useCallback } from 'react'
import { getUserSales } from '../../services/UsersService'
import Pagination from '../Products/Pagination'
import { userCancelSale } from '../../services/SaleService'
import { cashConverter } from '../../helpers/priceConverter'
import ClipLoader from "react-spinners/ClipLoader";
import './Orders.scss'
const Orders = () => {
  const [ sales, setSales ] = useState([])
  const [ currentPage, setCurrentPage] = useState(1)
  const [ suppPerPage ] = useState(3) //num
  const [ loader, setLoader ] = useState(true)

  const getSales = useCallback(
    async () => {
    try {
      const allSales = await getUserSales()
      const salesInvert = allSales.reverse()
      setSales(salesInvert)
      setLoader(false)
    } catch(e) { console.log(e.response.data)}
  }, [ ]
  )

  const cancelSale = useCallback(
    async (id) => {
      setLoader(true)
      await userCancelSale(id)
      await getSales()
      setLoader(false)
    }, [ getSales ]
  )

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
  }, [getSales])

  const indexOfLastSupp = currentPage * suppPerPage
  const indexOfFirstSupp = indexOfLastSupp - suppPerPage
  let currentSales = sales?.slice(indexOfFirstSupp, indexOfLastSupp)
  let salesLength = sales?.length

  const paginate = (n) => {
    setCurrentPage(n)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

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
              currentSales?.map((sale) => (
                <div key={sale.id} className="col-md-6 mb-4 ml-2 box-payy-info p-4">
                <div className="row justify-content-between align-items-center border-bottom mb-2 px-1">
                  <h4><b>{sale.products[0].supplier}</b></h4>
                  {sale.createdAt.slice(0, 10)}
                </div>
                <div className="">
                  {
                    sale.products.map((p) => (
                      <div key={p._id} className="row align-items-center justify-content-between my-3">
                        <div className="col-4"><img src={p.img} alt={p.name} style={{width: 120}}/></div>
                        <div className="col-4"><p>{p.name}</p></div>
                        <div className="col"><p> x0{p.quantity}</p></div>
                        <div className="col"><p>{cashConverter(p.price)} ???</p></div>
                      </div>
                    ))
                  }
                </div>
                <div className="row justify-content-center align-items-center">
                  <p><small>Env??o a: {sale.address.street} {sale.address.number}</small></p>
                </div>
                <div className="row align-items-center border-top pt-2">
                  <div className="col">
                    {
                      sale.state !== 'Cancelado' && sale.state !== 'Entregado' && <button 
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
          <div className=" row justify-content-center">
            <Pagination 
              prodPerPage={suppPerPage}
              totalProd={salesLength} 
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          </div>

        )
      }
    </>
  )
}

export default Orders