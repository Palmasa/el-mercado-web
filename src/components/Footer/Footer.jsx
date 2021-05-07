import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="container-fluid p-0 justify-content-center align-items-center">
    <div className="Footer row justify-content-around align-items-center p-4">
      <p>Atención al cliente</p>
      <p>Devoluciones</p>
      <Link to="/area-tiendas">¿Eres un vendedor?</Link>
      <small>Copyright 2021 El Mercado</small>
    </div>
    </div>
  )
}

export default Footer
