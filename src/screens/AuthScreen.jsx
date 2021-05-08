import Auth from '../fragments/auth/Auth'
import Navbar from '../fragments/Navbar/Navbar'
import bagImg from '../images/2777_R1NUIExBUiAyOTgtMjA.jpg'
const LoginScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-5 px-5">
            <img src={bagImg} alt="bolsa" style={{width: '100%'}}/>
          </div>
          <div className="col px-5 mb-5">
            <Auth shoppingBag={false}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
