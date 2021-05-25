import { useState, useEffect, useRef} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'
import { Redirect } from 'react-router'
import { getAllProducts } from '../../services/ProductsService'
import ResultsSearch from './ResultsSearch'
import ClipLoader from "react-spinners/ClipLoader";
import Speech from './Speech'
import useWindowDimensions from '../../hooks/useWindow'
import './Searchbar.scss'

const Searchbar = () => {
  const results = useRef(null)

  const { width } = useWindowDimensions()
  const [ closeCross, setCloseCross ] = useState(false)
  const [ products, setProducts ] = useState({})
  const [ loader, setLoader ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState(false)
  const [ param, setParam ] = useState('')
  const [ redirect, setRedirect ] = useState(false)
  const [ microPop, setMicroPop ] = useState(false)
  
  const clearInput = () => {
    setSearch('')
    setCloseCross(false)
    setSearchResult(false)
  }

  const microOpen = () => {
    setMicroPop(true)
  }

  const microClose = () => {
    setMicroPop(false)
  }

  window.onclick = (event) => {
    if (event.target === results.current) {
      clearInput()
    }
  }

  // Call api and set the list of products
  const getProducts = async () => {
    const allProducts = await getAllProducts()
    allProducts.listProducts
    ? setProducts(allProducts.listProducts)
    : setProducts(allProducts.yesSend)
    setLoader(false)
  }

  // Filter the products that you have
  const filterProducts = async (value) => {
    const filters = products.filter((p) => p.name.toLowerCase().includes(value))
    setProducts(filters)
    setLoader(false)
  }

  // Get the typing and call the filter function
  const handleChange = (event) => {
    setLoader(true)
    const { value } = event.target;
    setSearch(value);
    if (search !== '') {
      setCloseCross(true)
      filterProducts(value)
      setSearchResult(true)
    } else {
      getProducts()
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const onSearch = (event) => {
    if (event.key === 'Enter') {
      setParam(event.target.value)
      setRedirect(true)
      clearInput()
    } else if (event.key === 'Backspace' && event.target.value.length === 1) {
      setSearchResult(false)
      clearInput()
    }
  }

  return (
    <>
    <div className="Searchbar">
      <label className="Searchbar__glass" htmlFor="search">
        {
          loader
          ? (
            <div className=""><ClipLoader size='15' color="#E15D45" /></div>
          ) : (
            <AiOutlineSearch />
          )
        }
      </label>
      <input 
        className="Searchbar__input" 
        id="search" 
        placeholder="¿Qué estás buscando?" 
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={onSearch}
        value={search}
        />
      { closeCross 
        ? (
          <button className="cross" onClick={clearInput}><VscClose/></button>
        ) : (
          <button className="cross" onClick={microOpen}><BiMicrophone /></button>
        )
      }
      { redirect && (<Redirect to={`/productos?filter=${param}`}/>)}
    </div>
      { !loader && searchResult && (
        <>
            <div ref={results} className="overlay-search">
              <div className={`popUp-search px-4 ${ width < 640 && "popUp-search-xs"}`}>
                {
                  products.slice(0, 6).map((p) => (<ResultsSearch key={p.slug} slug={p.slug} name={p.name} imgs={p.img[0]}/>))
                }
              </div>
            </div>
        </>
      )
      }
      {
        microPop && (
          <Speech closeMicro={microClose}/>
        )
      }
    </>
  )
}

export default Searchbar
