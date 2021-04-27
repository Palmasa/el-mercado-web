import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Error from '../screens/Error'
import Home from '../screens/Home.screen';
import Products from '../screens/Products.screen';
import ProductDetail from '../screens/ProductDetail.screen';
import Suppliers from '../screens/Suppliers.screen';
import SupplierDetail from '../screens/SupplierDetail.screen';

const Router = () => {
  return (
    <BrowserRouter>
      {/* contextos */}
        <Switch>
          <Route exact path="/" component={Home}/>

          <Route exact path="/productos" component={Products}/>
          <Route exact path="/productos/:slug" component={ProductDetail}/>

          <Route exact path="/puestos" component={Suppliers}/>
          <Route exact path="/puestos/:slug" component={SupplierDetail}/>

          <Route exact path="/404" component={() => <Error code={404} />} />
          <Route exact path="/403" component={() => <Error code={403} />} />

          <Redirect to="/" />
        </Switch>
      {/* /contextos */}
    </BrowserRouter>
  )
}

export default Router
