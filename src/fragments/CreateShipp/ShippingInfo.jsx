import { useEffect, useState } from 'react'
import { getAllShippings, deleteShipping } from '../../services/SuppService.js'
import FadeLoader from "react-spinners/FadeLoader";
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import 'react-accessible-accordion/dist/fancy-example.css';
import './ShippingInfo.scss'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';

const notify = (value) => toast(value);

const ShippingInfo = () => {
  const [ shippings, setShippings ] = useState([])
  const [ loading, setLoading ] = useState(true)

  
  const getShipps = () => {
    getAllShippings()
    .then(res => {
      setShippings(res)
      setLoading(false)
    })
  }

  const deleteOneShipp = (id, name) => {
    deleteShipping(id)
    .then(() => {
      notify(`El modelo ${name} se ha eliminado`)
      getShipps()
    })
    .catch((e) => console.log(e.response.data))
  }

  useEffect(() => {
    getShipps()
  }, [])

  return (
    <div className="container p-4">
    <div className="row align-items-center mb-4">
    <div className="col-9">
      <h2>Modelos de envío</h2>
    </div>
    <div className="col">
      <Link className="acco-but" to="/envios-tiendas/crear-modelo-envio" >Crear nuevo modelo de envío</Link>
    </div>
    </div>
      {
        loading
        ? <FadeLoader color="#f1ebe4" width="3" height="14" radius="0"/>
        : (
          <div className="mb-5">
            <Accordion allowZeroExpanded="true">
          {
            shippings.map((shipping) => (
              <div key={Math.ceil(Math.random() * 1000)}>
                <AccordionItem >
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <b>{shipping.name}</b>
                      <p className="ml-5 mb-1 mt-2">Precio base: {shipping.shipping[0].sendPrice}€</p>
                      <p className="ml-5 mb-1">Tiempo estimado de entrega base: {shipping.shipping[0].sendTime}</p>
                      <p className="ml-5 mb-1">Descuento base a partir de: {shipping.shipping[0].sendDisccount}€</p>
                      <button className="ml-5 mt-2 acco-but" onClick={() => deleteOneShipp(shipping.id, shipping.name)}>Eliminar</button>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {shipping.shipping.map((p) => (
                      <div key={p.province} className="container">
                        <div className="row justify-content-between">
                          <p className="col">{p.province}</p>
                          <p className="col">{p.sendPrice}€</p>
                          <p className="col">{p.sendTime}</p>
                          <p className="col">{p.sendDisccount}€</p>
                        </div>
                      </div>
                    ))}
                  </AccordionItemPanel>
                </AccordionItem>

              </div>
          ))
          }
            </Accordion>
              {/*
                
              */}
          </div>
        )
      }
      <Toaster />
    </div>
  )
}

export default ShippingInfo
