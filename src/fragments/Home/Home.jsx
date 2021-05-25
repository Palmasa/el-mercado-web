import { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import PersonalShopper from './PersonalShopper';
import './Home.scss'

const Home = () => {
  const [ loading, setLoading] = useState(false) // CAMBIAR JFJ


  useEffect(() => {

  }, [ ])

  return (
    <>
     {
       loading
       ? (
        <div style={{ height: 650}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
        </div>
       )
       : (
         <>
        <div className="container">
          <div className="row heather-home p-5">
              HEATHER
          </div>
        </div>
        <div className="container">
          <div className="row carouseles-home p-5">
              LOS MÁS VENDIDOS CAROUSEL
          </div>
        </div>

        <PersonalShopper />

        <div className="container">
          <div className="row carouseles-home p-5">
              CAROUSEL CATEGORÍAS 
          </div>
        </div>
        </>
       )
      }
    </>
  )
}

export default Home
