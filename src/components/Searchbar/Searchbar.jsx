import { useState, useEffect, useRef} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { VscClose } from 'react-icons/vsc'
import { Redirect } from 'react-router'
import { getAllProducts } from '../../services/ProductsService'
import ResultsSearch from './ResultsSearch'
import './Searchbar.scss'

const Searchbar = () => {
  const results = useRef(null)

  const [ closeCross, setCloseCross ] = useState(false)
  const [ products, setProducts ] = useState({})
  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState(false)
  const [ loading, setLoading] = useState(false)
  const [param, setParam] = useState('')
  const [redirect, setRedirect] = useState(false)
  
  const clearInput = () => {
    setSearch('')
    setCloseCross(false)
    setSearchResult(false)
  }

  window.onclick = (event) => {
    if (event.target === results.current) {
      clearInput()
    }
  }

  // Call api and set the list of products
  const getProducts = async () => {
    setLoading(true)
    const allProducts = await getAllProducts()
    allProducts.listProducts
    ? setProducts(allProducts.listProducts)
    : setProducts(allProducts.yesSend)
    setLoading(false)
  }

  // Filter the products that you have
  const filterProducts = async (value) => {
    const filters = products.filter((p) => p.name.toLowerCase().includes(value))
    setProducts(filters)
    setLoading(false)
  }

  // Get the typing and call the filter function
  const handleChange = (event) => {
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
        <AiOutlineSearch />
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
      { closeCross && <button className="cross" onClick={clearInput}><VscClose/></button> }


      { redirect && (<Redirect to={`/productos?filter=${param}`}/>)}
    </div>
      { searchResult && (
        <div ref={results} className="overlay-search">
          <div className="popUp-search px-4">
            {
              products.slice(0, 10).map((p) => (<ResultsSearch key={p.slug} slug={p.slug} name={p.name} imgs={p.img[0]}/>))
            }
          </div>
        </div>
        )
      }
    </>
  )
}

export default Searchbar
