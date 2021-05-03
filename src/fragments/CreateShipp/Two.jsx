import { useFormik } from 'formik';
import { createShipping } from '../../services/ShippService';
import SuppNavbar from '../SuppNavbar/SuppNavbar';
import './CreateShip.scss'
import SelectCustom from './SelectCustom';


const Two = () => {

  const validate = values => {
    const errors = {}
    if (!values.name) { errors.name = 'eeeerrroo'}
    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      selected: 'two',
      price: 0,
      sendtime: '',
      sendDisccount: 0,
      different: ''
    },
    validate,
    onSubmit: values => {
      /* createShipping(values) */
      console.log(values)
    }
  })

  return (
    <div>
      
    </div>
  )
}

export default Two
