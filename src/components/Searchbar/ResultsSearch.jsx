import { Link } from 'react-router-dom'
import './ResultsSearch.scss'

const ResultsSearch = ({name, slug, imgs }) => {

  return (
    <Link 
      className="text-search-result row w-100 py-2 align-items-center" 
      to={`/productos/${slug}`}>
      <div className="col-2 justify-content-center text-center mr-3">
        <img src={imgs} alt={name} style={{height: 40}}/>
      </div>
      <div className="col">
        <p style={{marginBottom: 0, fontSize: 18}}>{name}</p>
      </div>
    </Link>
  )
}

export default ResultsSearch
