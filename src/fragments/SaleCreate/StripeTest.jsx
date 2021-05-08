import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import logo from '../../images/2777_R1NUIExBUiAyOTgtMjA.jpg'
import { payRealSale } from '../../services/SaleService'
import { useHistory } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import './StripeTest.scss'

const notify = (value) => toast(value);
const stripePromise = loadStripe('pk_test_51Ik9zhKuQKvQj70tseLpVqY4OWJwWPMGFDUvVjrJy2xgjJfA9wWzs64dAtK3M9DWT6YKHCNrv2eKYZT7bRW0QFUp00QrysCHcq')

const CheckoutForm = ({ cartTotal }) => {
  const { removeAllCart } = useContext(CartContext)
  const { push } = useHistory()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    const roundedNum = Math.round(Number(cartTotal * 100))

    if (!error) {
      try {
        const { id } = paymentMethod
        const body = {}
        body.id = id
        body.amount = roundedNum
        await payRealSale(body)
        elements.getElement(CardElement).clear()
        removeAllCart()
        notify('Compra realizada con éxito')
      } catch(e) {
        console.log(e)
      }
      push('/productos')
    } else {
      console.log(error)
    }
  }

  return <form onSubmit={handleSubmit} className="row justify-content-center px-5 Stripe-pay">
    <div className="col">
      <img src={logo} alt="logo" className="img-fluid" style={{width: 300}} />
    </div>
    <div className="col">
    <div className="card mt-5 p-2 pb-2">
      <h3 className="text-center mt-4">Total: {cartTotal} €</h3>
      <div className="form-group mt-3">
        <CardElement className="form-control"/>
      </div>
      <button className="mb-4">Pagar</button>
    </div>
    <Toaster />
    </div>
  </form>
}

const StripeTest = ({ cartTotal }) => {
  return (
      <Elements stripe={stripePromise}>
        <div className="container p-5">
          <CheckoutForm cartTotal={cartTotal}/>
        </div>
      </Elements>
  )
}

export default StripeTest
