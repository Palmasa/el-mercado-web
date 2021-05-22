import { useState, useEffect } from 'react'
import { allCategs } from '../../helpers/allCategs.js'
import { Redirect } from 'react-router'
import useWindowDimensions from '../../hooks/useWindow'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import XSCategFilter from './XSCategFilter'
import './CategFilter.scss'

const CategFilter = () => {
  const { width } = useWindowDimensions()
  const [ mainCategs, setMain ] = useState([])
  const [ subCategs, setSub ] = useState([])
  const [param, setParam] = useState('')
  const [from, setFrom] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [redirect2, setRedirect2] = useState(false)
  const [xsCategs, setXsCategs] = useState(false)

  const getMain = (i) => {
    setParam(i)
    setRedirect(true)
    setRedirect2(false)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const getSub = (categ, i) => {
    setParam(categ)
    setFrom(i)
    setRedirect2(true)
    setRedirect(false)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const paintCategs = () => {
    const main = Object.keys(allCategs)
    setMain(main)
    const subs = Object.values(allCategs)
    setSub(subs)
  }

  const openCategs = () => {
    setXsCategs(true)
  }

  const closeCategs = () => {
    setXsCategs(false)
  }

  useEffect(() => {
    paintCategs()
  }, [])

  return (
    <>
    {
      width > 640 
      ? (
        <div className="categories mt-5">
          {
            subCategs?.map((sub, i) => (
            <div key={i} className="all-categs">
            <button className="main-categ text-left" onClick={() => getMain(i)}><b>{mainCategs[i]}</b></button>
              {
                sub.length === 1
                ? ""
                : sub.map((s) => <button key={s} className="sub-categ text-left" onClick={() => getSub(s, i)}>{s}</button>)
              }
            </div>
          ))
          }
        { redirect && (<Redirect to={`/productos?categoria=${param}`}/>)}
        { redirect2 && (<Redirect to={`/productos?subcategoria=${param}&n=${from}`}/>)}
        </div>
      ) : (
        <>
        <button className="floatCategButton" onClick={openCategs}><AiOutlineUnorderedList /></button>
        {
          xsCategs && <XSCategFilter 
            closeCategs={closeCategs}
            main={mainCategs}
            sub={subCategs}
          />
        }
        </>
      )
    }
    </>
  )
}

export default CategFilter
