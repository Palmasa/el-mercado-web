import { useContext } from 'react'
import { SuppContext } from '../../contexts/SuppContext'
import { AiOutlineShop, AiOutlineShopping, AiOutlineBank, AiOutlineCarryOut } from 'react-icons/ai'
import { IconContext } from "react-icons"
import './SuppHome.scss'

const SuppHome = () => {
  const { supp } = useContext(SuppContext)

  return (
    <>
    <IconContext.Provider value={{ size: "6em", color: '#2c2728' }}>
    { supp 
      ? (
        <div className="SuppHome">
        <h2>TIENDAS</h2>
        <h5>Es posible gracias a vosotros</h5>
        </div>
      ) : (
        <div className="SuppHome">
        <AiOutlineShop />
        <h1>¿Listo para vender?</h1>
        <h5>Es posible gracias a vosotros</h5>
        </div>
      )
    }
    </IconContext.Provider>
    <IconContext.Provider value={{ size: "3em", color: '#E15D45' }}>
    <div className="container p-5 mb-3">
      <div className="row justify-content-center text-center mb-4">
        <h1>Crea un puesto y aumenta tus ventas</h1>
        <p style={{lineHeight: 1.5, marginTop: 10}}>Actualmente en El Mercado hay un catálogo con más de 10.000 referencias gracias a más de 30 tiendas de distintos rincones de la geografía nacional --algunas son auténticos referentes en el sector-- comercializando su género de la más alta calidad y honrando el verdadero significado de la gastronomía española.</p>
      </div>
      <div className="row row-cols-1 row-cols-md-8 g-2">
        <div className="col text-center mx-5">
          <AiOutlineShopping />
          <h4 style={{color: '#E15D45', marginTop: 10}}>Clientes</h4>
          <p>Pasa a vender tus productos, de un día para otro, en nuestro centro comercial online por el que pasan miles de clientes potenciales a diario.</p>
        </div>
        <div className="col text-center">
          <AiOutlineBank />
          <h4 style={{color: '#E15D45', marginTop: 10}}>Proveedores</h4>
          <p>Para pequeños y medianos productores: Si elaboras tus propios embutidos, quesos, mermeladas, etc o cultivas tu propio huerto, este es tu lugar</p>
        </div>
        <div className="col text-center mx-5">
          <AiOutlineCarryOut />
          <h4 style={{color: '#E15D45', marginTop: 10}}>Productores</h4>
          <p>Si posees una pescadería, carnicería, frutería o cualquier otro tipo de tienda física de alimentación y vendes en tu barrio, de acción de una forma sencilla y sin sobrecostes.</p>
        </div>
      </div>
    </div>
    </IconContext.Provider>
    </>
  )
}

export default SuppHome
