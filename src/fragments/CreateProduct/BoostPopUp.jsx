import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { boostProduct } from '../../services/ProductsService'
import ClipLoader from "react-spinners/ClipLoader";
import { TiWarningOutline } from "react-icons/ti"
import { Link } from 'react-router-dom'
import pic from '../../images/supp_pic.png'
import './BoostPopUp.scss'

const BoostPopUp = ({ product, setClose}) => {
  const [ boosted, setBoosted ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const onPremium = async () => {
    setLoading(true)
    await boostProduct(product.id, { payment: 1500 })
    setBoosted(true)
    setLoading(false)
  }

  const onSuper = async () => {
    setLoading(true)
    await boostProduct(product.id, { payment: 900 })
    setBoosted(true)
    setLoading(false)
    
  }

  const onBasic = async () => {
    setLoading(true)
    await boostProduct(product.id, { payment: 500 })
    setBoosted(true)
    setLoading(false)
    
  }

  return (
    <div className="overlayBoost">
      <div className="popupBopost container p-3 px-5">
        
        <div className="row justify-content-end closeMD">
          <button onClick={() => setClose(false)}><MdClose/></button>
        </div>

      {
        loading
        ? (
          <div style={{ height: 700}}>
            <div className="spinner-style"><ClipLoader color="#E15D45" /></div>
          </div>
        )
        : (
          <>
          {
            boosted
            ? (
              <>
              <div className="row mt-3 mx-3">
                <div className="col-6 container">
                  <img src={pic} alt="cart" className="img-fluid"/>
                </div>
                <div className="col container">
                  <div className="row mt-3 mx-3">
                    <h3>¡Enhorabuena!</h3>
                  </div>
                  <div className="row mt-3 mx-3">
                    <h6>Durante los póximos 30 días tu producto estará promocionado. Te avisaremos cinco días hábiles antes de que se te acabe la promoción y se te enviará la factura pertinente.</h6>
                  </div>
                  <div className="row mt-3 mx-3">
                    <h6>Para cualquier duda o consulta puede consultar con el asesor personalizado que le hemos asignado:</h6>
                  </div>
                  <div className="row mt-3 mx-3 justify-content-center tittle-boost boost-premium p-2">
                    <h6>Inés</h6>
                    <h6>ines@el-mercado.es</h6>
                  </div>
                  <div className="row mt-3 mx-3">
                    <h6>La activación tardará un máximo de cinco minutos en hacerse efectiva.</h6>
                  </div>
                  <div className="row mt-3 mx-3">
                    <h6>Muchas gracias por confiar en El Mercado</h6>
                  </div>
                </div>

              </div>
              </>
            ) : (
            <>
            <div className="row mt-3 mx-3">
              <h4>Promocionar: {product.name}</h4>
            </div>

            <div className="row mx-3">
              <p style={{marginBottom: 0}}>Promociona tus productos y te ayudamos a que tu negocio crezca. Para cualquier consulta no dudes en contactar a nuestra especialista en ines@el-mercado.es.</p>
            </div>

            <div className="row mt-4 mx-3">

              <div className="col-4 container px-2 py-4 boostOffer">
                <div className="row pt-2 pb-1 tittle-boost boost-premium">
                  <h4>Promoción Premium</h4>
                  <h4>15€ <small> / 30 días</small></h4>
                </div>
                <div className="row px-5 mt-2">
                  <p style={{marginBottom: 8}}>La oferta Premium te garantiza:</p>
                </div>
                <div className="row px-5 mb-2">
                  <li>Visibilidad en la home</li>
                  <li>Cross-selling en otras tiendas</li>
                  <li>Recomendación a nuevos clientes</li>
                  <li>Aumento de venta ya clientes</li>
                </div>

                <div className="row px-5 mb-3 mt-3 align-items-center">
                  <input type="checkBox" className="mr-2"/>
                  <label style={{marginBottom: 0, fontSize: 14}}> <small>Acepto los <Link to="/#" className="terms">términos y condiciones.</Link></small></label>
                </div>

                <div className="row justify-content-center">
                  <button className="buyButtonBoost" onClick={onPremium}>Contratar</button>
                </div>
              </div>

              <div className="col-3 container px-2 py-4 boostOffer">
                <div className="row pt-2 pb-1 tittle-boost">
                  <h4>Promoción Inter</h4>
                  <h4>9€ <small> / 30 días</small></h4>
                </div>
                <div className="row px-5 mt-2">
                  <p style={{marginBottom: 8}}>La oferta Inter incluye:</p>
                </div>
                <div className="row px-5 mb-2">
                  <li>Visibilidad en la home</li>
                  <li>Productos relacionados</li>
                  <li>Recomendaciones</li>
                  <li className="notIncluded">Venta a ya clientes</li>
                </div>

                <div className="row px-5 mb-3 mt-3 align-items-center">
                  <input type="checkBox" className="mr-2"/>
                  <label style={{marginBottom: 0, fontSize: 14}}> <small>Acepto los <Link to="/#" className="terms">términos y condiciones.</Link></small></label>
                </div>

                <div className="row justify-content-center">
                  <button className="buyButtonBoost" onClick={onSuper}>Contratar</button>
                </div>
              </div>

              <div className="col-3 container mr-4 px-2 py-4 boostOffer">
                <div className="row pt-2 pb-1 tittle-boost">
                  <h4>Promoción Básica</h4>
                  <h4>5€ <small> / 30 días</small></h4>
                </div>
                <div className="row px-5 mt-2">
                  <p style={{marginBottom: 8}}>La oferta Básica incluye:</p>
                </div>
                <div className="row px-5 mb-2">
                  <li>Visibilidad en la home</li>
                  <li className="notIncluded">Productos relacionados</li>
                  <li className="notIncluded">Recomendaciones</li>
                  <li className="notIncluded">Venta a ya clientes</li>
                </div>

                <div className="row px-5 mb-3 mt-3 align-items-center">
                  <input type="checkBox" className="mr-2"/>
                  <label style={{marginBottom: 0, fontSize: 14}}> <small>Acepto los <Link to="/#" className="terms">términos y condiciones.</Link></small></label>
                </div>

                <div className="row justify-content-center">
                  <button className="buyButtonBoost" onClick={onBasic}>Contratar</button>
                </div>
              </div>

            </div>
            <div className="row mt-4 px-5 align-items-center">
              <p><TiWarningOutline/><small> Cobro los días 28 al mes siguiente a la contratación. Cancelaciones y reembolsos contactar a ines@el-mercado.es.</small></p>
            </div>
            </>
            )
          }
          </>
        )
      }

      </div>
    </div>
  )
}

export default BoostPopUp
