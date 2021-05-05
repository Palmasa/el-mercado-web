import { Link } from 'react-router-dom'
import { BsArrowRightShort } from 'react-icons/bs'
import './SelectForm.scss'

const SelectForm = () => {

  return (
    <div className="container py-5">
        <div className="row justify-content-center mb-4 border-bottom">
          <h2>Seleccionar base de modelo de envío</h2>
        </div>
    <div className="row py-5">
      <div className="col ">
        <div className="row px-5">
        <h4>¿Por qué?</h4>
          <p>
            Los modelos de envío son necesarios para crear productos.
            Por favor, seleccione la opción que mejor encaje con su gestión de envíos. Después podrá añadir provincias y excepciones.
          </p>
        </div>
      </div>
      <div className="col pl-4 px-2 mb-5">
        <div className="container shipping-models">
          <li><BsArrowRightShort/><Link className="link-shipp-model" to="/envios-tiendas/crear-modelo-envio/1"> Todo el territorio nacional</Link></li>
          <li><BsArrowRightShort/><Link className="link-shipp-model" to="/envios-tiendas/crear-modelo-envio/2"> Solo península</Link></li>
          <li><BsArrowRightShort/><Link className="link-shipp-model" to="/envios-tiendas/crear-modelo-envio/3"> Península y Baleares (sin Ceuta y Melilla)</Link></li>
          <li><BsArrowRightShort/><Link className="link-shipp-model" to="/envios-tiendas/crear-modelo-envio/4"> Península y Baleares (incluyendo Ceuta y Melilla)</Link></li>
          <li><BsArrowRightShort/><Link className="link-shipp-model" to="/envios-tiendas/crear-modelo-envio/5"> Solo Canarias</Link></li>
        </div>
      </div>
    </div>
    {/* <div className="row">
      <Link to="/envios-tiendas/crear-modelo-envio/provincias"><small>Seleccionar provincia a provincia</small></Link>
      <Link to="/envios-tiendas/crear-modelo-envio/ccaa"><small>Seleccionar por comunidad autónoma</small></Link>
    </div> */}
    </div>
  )
}

export default SelectForm
