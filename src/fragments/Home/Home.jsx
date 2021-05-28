import { useContext} from 'react'
import { UserContext } from '../../contexts/UserContext'
import MostPopular from './MostPopular';
import BuyAgain from './BuyAgain';
import CardCateg from './CardCateg';
import Boosted from './Boosted';
import { Redirect } from 'react-router'
import useWindowDimensions from '../../hooks/useWindow'
import './Home.scss'

const Home = () => {
  const { width } = useWindowDimensions()
  const { user } = useContext(UserContext)
  window.scrollTo({top: 0})
  
  return (
    <>
      <div className="mt-4">
        <CardCateg />
      </div>
      <div className="mt-4">
        <Boosted color="#f1ebe4" text={`${user?.name}, te recomendamos`}/>
      </div>
      <div>
        <MostPopular />
      </div>
      {
        user && (
        <div>
          <BuyAgain />
        </div>
        )
      }
      { width < 640 && (<Redirect to="/productos"/>)}
    </>
  )
}

export default Home
