import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="container-fluid Footer">
      <div className="row justify-content-center align-items-center px-5 py-4">
          <Link className="footer-link mx-5" to="/">Inicio</Link>
          <Link className="footer-link mx-5" to="/productos">Productos</Link>
          <Link className="footer-link mx-5" to="/tiendas">Tiendas</Link>
          <Link className="footer-link mx-5" to="/area-tiendas">Mi puesto</Link>
      </div>
      <div className="align-items-center pb-3">
        <div className="row pl-2 justify-content-center ">
          <p><small>Copyright 2021 El Mercado</small></p> 
        </div>
      </div>
    </div> 
  )
}

export default Footer
