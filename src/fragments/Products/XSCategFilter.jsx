import { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { Redirect } from 'react-router'
import './XSCategFilter.scss'

const XSCategFilter = ({closeCategs, sub, main}) => {
  const modalCateg = useRef(null);
  const [param, setParam] = useState('')
  const [from, setFrom] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [redirect2, setRedirect2] = useState(false)

  window.onclick = (event) => {
    if (event.target === modalCateg.current) {
      closeCategs()
    }
  }

  const getMain = (i) => {
    setParam(i)
    setRedirect(true)
    setRedirect2(false)
    setTimeout((()=> {
      closeCategs()
    }), 100)
  }

  const getSub = (categ, i) => {
    setParam(categ)
    setFrom(i)
    setRedirect2(true)
    setRedirect(false)
    setTimeout((()=> {
      closeCategs()
    }), 100)
  }

  return (
    <div ref={modalCateg} className="overlayCategs">
      <div className="popUpCategs">
        <div className="container">
          <button onClick={() => closeCategs()} className="closeCategs"> <MdClose /></button>
        </div>
        <div>
        <div className="categs-scroll strech">
          {
                sub?.map((sub, i) => (
                <div key={i} className="card-categ">
                <button className="text-left" onClick={() => getMain(i)}><b>{main[i]}</b></button>
                  {
                    sub.length === 1
                    ? ""
                    : sub.map((s) => <button key={s} className="text-left" onClick={() => getSub(s, i)}>{s}</button>)
                  }
                </div>
              ))
          }
        </div>
        </div>
      </div>
      { redirect && (<Redirect to={`/productos?categoria=${param}`}/>)}
      { redirect2 && (<Redirect to={`/productos?subcategoria=${param}&n=${from}`}/>)}
    </div>
  )
}

export default XSCategFilter
