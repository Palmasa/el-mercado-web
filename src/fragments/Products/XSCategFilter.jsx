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
      <button onClick={() => closeCategs()}> <MdClose /></button>
      {
            sub?.map((sub, i) => (
            <div key={i} className="all-categs">
            <button className="main-categ text-left" onClick={() => getMain(i)}><b>{main[i]}</b></button>
              {
                sub.length === 1
                ? ""
                : sub.map((s) => <button key={s} className="sub-categ text-left" onClick={() => getSub(s, i)}>{s}</button>)
              }
            </div>
          ))
      }
        <p>TBC...</p>
      </div>
      { redirect && (<Redirect to={`/productos?categoria=${param}`}/>)}
      { redirect2 && (<Redirect to={`/productos?subcategoria=${param}&n=${from}`}/>)}
    </div>
  )
}

export default XSCategFilter
