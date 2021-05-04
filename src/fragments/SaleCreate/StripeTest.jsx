import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import logo from '../../images/logos/DARK.png'
import { payRealSale } from '../../services/SaleService'
import './StripeTest.scss'

const stripePromise = loadStripe('pk_test_51Ik9zhKuQKvQj70tseLpVqY4OWJwWPMGFDUvVjrJy2xgjJfA9wWzs64dAtK3M9DWT6YKHCNrv2eKYZT7bRW0QFUp00QrysCHcq')

const CheckoutForm = ({ cartTotal }) => {
  const { removeAllCart } = useContext(CartContext)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (!error) {
      try {
        const { id } = paymentMethod
        const body = {}
        body.id = id
        body.amount = cartTotal * 100
        const response = await payRealSale(body)
        console.log(response)
        elements.getElement(CardElement).clear()
        removeAllCart()
      } catch(e) {
        console.log(e)
      }

    } else {
      console.log(error)
    }
  }

  return <form onSubmit={handleSubmit} className="card card-body">
    <img src={logo} alt="logo" className="img-fluid" />
    <h3 className="text-center mt-4">{cartTotal}€</h3>
    <div className="form-group mt-3">
      <CardElement className="form-control"/>
    </div>
    <button>Pagar</button>
  </form>
}

const StripeTest = ({ cartTotal }) => {
  return (
      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row justify-content-center">
            <div className="col-md">
              <CheckoutForm cartTotal={cartTotal}/>
            </div>
          </div>
        </div>
      </Elements>
  )
}

export default StripeTest
