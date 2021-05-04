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
          <p>{sale.state}</p>
        ))
      }
    </div>
  )
}

export default Orders