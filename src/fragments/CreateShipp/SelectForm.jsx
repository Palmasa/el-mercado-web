import { Link } from 'react-router-dom'

const SelectForm = () => {

  return (
    <div className="container">
      <li><Link to="/envios-tiendas/crear-modelo-envio/1">Todo el territorio nacional</Link></li>
      <li><Link to="/envios-tiendas/crear-modelo-envio/2">Solo peninsula</Link></li>
      <li><Link to="/envios-tiendas/crear-modelo-envio/3">Peninsula y Baleares (sin Ceuta y Melilla)</Link></li>
      <li><Link to="/envios-tiendas/crear-modelo-envio/4">Peninsula y Baleares (incluyendo Ceuta y Melilla)</Link></li>
      <li><Link to="/envios-tiendas/crear-modelo-envio/5">Solo Canarias</Link></li>
      
      <Link to="/envios-tiendas/crear-modelo-envio/provincias">Seleccionar provincia a provincia</Link>
      <Link to="/envios-tiendas/crear-modelo-envio/ccaa">Seleccionar por comunidad autónoma</Link>
    </div>
  )
}

export default SelectForm
