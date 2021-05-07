import { useState, useEffect } from 'react'
import { allCategs } from '../../helpers/allCategs.js'
import { Redirect } from 'react-router'

const CategFilter = () => {
  const [ mainCategs, setMain ] = useState([])
  const [ subCategs, setSub ] = useState([])
  const [param, setParam] = useState('')
  const [from, setFrom] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [redirect2, setRedirect2] = useState(false)

  const getMain = (i) => {
    setParam(i)
    setRedirect(true)
    setRedirect2(false)
  }

  const getSub = (categ, i) => {
    setParam(categ)
    setFrom(i)
    setRedirect2(true)
    setRedirect(false)
  }

  const paintCategs = () => {
    const main = Object.keys(allCategs)
    setMain(main)
    const subs = Object.values(allCategs)
    setSub(subs)
  }

  useEffect(() => {
    paintCategs()
  }, [])

  return (
    <div>
      {
        subCategs?.map((sub, i) => (
        <div key={i}>
        <button onClick={() => getMain(i)}><h4>{mainCategs[i]}</h4></button>
          {
            sub.length === 1
            ? ""
            : sub.map((s) => <button onClick={() => getSub(s, i)}>{s}</button>)
          }
        </div>
      ))
    }
    { redirect && (<Redirect to={`/productos?categoria=${param}`}/>)}
    { redirect2 && (<Redirect to={`/productos?subcategoria=${param}&n=${from}`}/>)}
    </div>
  )
}

export default CategFilter
