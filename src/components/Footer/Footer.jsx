import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="Footer">
      <p>Atención al cliente</p>
      <p>Devoluciones</p>
      <Link to="/acceso-puestos">¿Eres un vendedor?</Link>
      <p>Política de privacidad</p>
      <p>Cookies</p>
      <small>Copyright 2021 El Mercado</small>
    </div>
  )
}

export default Footer
