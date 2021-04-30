import { useEffect, useState } from 'react'
import { getUserSales } from '../../services/UsersService'

const Orders = () => {
  const [ sales, setSales ] = useState([])

  const getSales = async () => {
    try {
      const allSales = await getUserSales()
      return (allSales)
    } catch(e) { console.log(e.response.data)}
  }

  useEffect(() => {
    setSales(getSales())
  }, [])

  return (
    <div>
      {
        sales?.map((sale) => (
          <p>{sale}</p>
        ))
      }
    </div>
  )
}

export default Orders