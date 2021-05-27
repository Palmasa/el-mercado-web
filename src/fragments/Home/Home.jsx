import { useContext} from 'react'
import PersonalShopper from './PersonalShopper';
import { UserContext } from '../../contexts/UserContext'
import MostPopular from './MostPopular';
import BuyAgain from './BuyAgain';
import CardCateg from './CardCateg';
import './Home.scss'
import Boosted from './Boosted';

const Home = () => {
  const { user } = useContext(UserContext)
  
  return (
    <>
      <div>
        <MostPopular />
      </div>
      <div className="mt-4">
        <Boosted color="#f1ebe4" text={`${user?.name}, te recomendamos`}/>
      </div>
      <div className="mt-4">
        <CardCateg />
      </div>
      <PersonalShopper />
      {
        user && (
        <div>
          <BuyAgain />
        </div>
        )
      }
    </>
  )
}

export default Home
