import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="container-fluid p-0 justify-content-center align-items-center">
    <div className="Footer d-flex justify-content-around align-items-center p-4">
      <p><small>Copyright 2021 El Mercado</small></p> 
      <Link className="footer-link" to="/area-tiendas">Mi tienda</Link>
    </div> 
    </div>
  )
}

export default Footer
