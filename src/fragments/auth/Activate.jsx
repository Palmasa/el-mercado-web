import { useEffect } from 'react';
import { useParams, Redirect} from 'react-router-dom';
import { activate } from '../../services/AuthService.js';

const Activate = () => {
  const { token } = useParams()

  useEffect(() => {
    activate(token)
  }, [token])

  return (
    <Redirect to="/acceso-usuarios"/>
  )
}

export default Activate
