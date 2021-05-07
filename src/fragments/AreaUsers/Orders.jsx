import { useEffect, useState } from 'react'
import { getUserSales } from '../../services/UsersService'

const Orders = () => {
  const [ sales, setSales ] = useState([])

  const getSales = async () => {
    try {
      const allSales = await getUserSales()
      setSales(allSales)
    } catch(e) { console.log(e.response.data)}
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <div>
      {
        sales?.map((sale) => (
          <div key={sale.id} className="row border">
            <p>{sale.state}</p>
            <p>{sale.address.city}, {sale.address.street} {sale.address.number}, {sale.address.block}</p>
            {
              sale.products.map((p) => (
                <div className={p.id}>
                  <p>{p.name}</p>
                  <p>{p.supplier}</p>
                  <p>x0{p.quantity}</p>
                  <p>{p.price}</p>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Orders