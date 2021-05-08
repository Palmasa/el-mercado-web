import React from 'react'
import { useState, useEffect } from 'react'
import { getSuppliers } from '../../services/SuppService.js'
import Pagination from '../Products/Pagination'
import ClipLoader from "react-spinners/ClipLoader";
import CardSupp from './CardSupp.jsx'

const AllSupp = () => {
  const [ suppliers, setSuppliers ] = useState([])
  const [ currentPage, setCurrentPage] = useState(1)
  const [ suppPerPage ] = useState(5) //num

  const getAllSupp = () => {
    getSuppliers()
    .then((res) => {
      setSuppliers(res)
    })
  }

  useEffect(() => {
    getAllSupp()
  }, [])

  const indexOfLastSupp = currentPage * suppPerPage
  const indexOfFirstSupp = indexOfLastSupp - suppPerPage
  let currentSupp = suppliers?.slice(indexOfFirstSupp, indexOfLastSupp)
  let suppLength = suppliers?.length

  const paginate = (n) => {
    setCurrentPage(n)
  }
  if (!suppliers) {
    return (
    <div style={{height: 700}}>
    <div className="spinner-style"><ClipLoader color="#E15D45" />
    </div>
    </div>)
  }
  return (
    <div className="py-5">
    <div className="container">
      <div className="row hidden-md-up">
    {
      currentSupp.map((supp) => (
        <div key={supp.id} className="col-md-4  mb-3">
            <CardSupp supplier={supp} />
        </div>
      ))
    }
      </div>
      <Pagination 
        prodPerPage={suppPerPage}
        totalProd={suppLength} 
        paginate={paginate}
      />
      </div>
    </div>
  )
}

export default AllSupp
