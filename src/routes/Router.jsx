import { Route, Switch, Redirect} from 'react-router-dom';
import Error from '../screens/Error'
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SuppliersScreen from '../screens/SuppliersScreen';
import SupplierDetailScreen from '../screens/SupplierDetailScreen';
import AuthScreen from '../screens/AuthScreen'
import Activate from '../fragments/auth/Activate'
import AreaUsersScreen from '../screens/AreaUsersScreen';
import AuthSuppScreen from '../screens/AuthSuppScreen';
import CreateShippScreen from '../screens/CreateShippScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import AreaSuppScreen from '../screens/AreaSuppScreen';

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeScreen}/>

        <Route exact path="/productos" component={ProductsScreen}/>
        <Route exact path="/productos/:slug" component={ProductDetailScreen}/>

        <Route exact path="/puestos" component={SuppliersScreen}/>
        <Route exact path="/puestos/:slug" component={SupplierDetailScreen}/>

        <Route exact path="/acceso-usuarios" component={AuthScreen}/>
        <Route exact path="/activar-usuarios/:token" component={Activate}/>
        <Route exact path="/area-privada-usuarios" component={AreaUsersScreen}/>

        <Route exact path="/acceso-puestos" component={AuthSuppScreen} />
        <Route exact path="/area-privada-puestos/crear-modelo-envio" component={CreateShippScreen} />
        <Route exact path="/area-privada-puestos/crear-producto" component={CreateProductScreen} />
        <Route exact path="/area-privada-puestos" component={AreaSuppScreen} />

        <Route exact path="/404" component={() => <Error code={404} />} />
        <Route exact path="/403" component={() => <Error code={403} />} />

        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Router
