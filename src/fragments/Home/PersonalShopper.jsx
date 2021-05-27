import { useState } from 'react'
import { FaHandsHelping } from 'react-icons/fa'
import PopUpShopper from './PopUpShopper'

const PersonalShopper = () => {
  const [ popup, setPopup] = useState(false)

  const closePop = () => {
    setPopup(false)
  }

  const openPop = () => {
    setPopup(true)
  }

  return (
    <div className="container-fluid w-100 contact-home">
      <div className="row p-5">
        <div className="col-md-7 col-sm-12 pl-5">
          <h3 className="pl-3">¿Te ayudamos? <FaHandsHelping/> </h3>
          <p className="pl-3">
            En El Mercado queremos que tengas la mejor experiencia, por eso te ofrecemos un servicio de asesoramiento 100% gratuito.
            ¿Te apuntas? Envíanos tu nombre, tu número de teléfono o tu email y te asignaremos un asesor personal que te guiará en tus compras, cómo y cuando quieras.
          </p>
        </div>
        <div className="col d-flex justify-content-center align-items-center mt-3">
          <button onClick={openPop} className="actionAsesor">Asesoramiento personalizado</button>
        </div>
      </div>
      {
        popup && <PopUpShopper setClose={closePop} />
      }
    </div>
  )
}

export default PersonalShopper
