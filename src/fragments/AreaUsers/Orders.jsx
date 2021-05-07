import { useEffect, useState } from 'react'
import { getUserSales } from '../../services/UsersService'
import { userCancelSale } from '../../services/SaleService'
import { cashConverter } from '../../helpers/priceConverter'

const Orders = () => {
  const [ sales, setSales ] = useState([])

  const getSales = async () => {
    try {
      const allSales = await getUserSales()
      setSales(allSales)
    } catch(e) { console.log(e.response.data)}
  }

  const cancelSale = (id) => {
    userCancelSale(id)
    .then((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <div>
      {
        sales?.map((sale) => (
          <div key={sale.id} className="row border">
            <h1>{sale.state}</h1>
            <p>{sale.address.city}, {sale.address.street} {sale.address.number}, {sale.address.block}</p>
            {
              sale.products.map((p) => (
                <div key={p.id}>
                  <p>{p.name}</p>
                  <p>{p.supplier}</p>
                  <p>x0{p.quantity}</p>
                  <p>{cashConverter(p.price)}€</p>
                </div>
              ))
            }
            <button onClick={() => cancelSale(sale.id)}>Cancelar</button>
          </div>
        ))
      }
    </div>
  )
}

export default Orders