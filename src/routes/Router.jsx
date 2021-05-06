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
import CreateShippScreen from '../screens/Suppliers/CreateShippScreen';
import CreateProductScreen from '../screens/Suppliers/CreateProductScreen';
import AdminSuppScreen from '../screens/Suppliers/AdminSuppScreen';
import HomeSuppScreen from '../screens/Suppliers/HomeSuppScreen';
import LoginSuppScreen from '../screens/Suppliers/LoginSuppScreen';
import RegisterSuppScreen from '../screens/Suppliers/RegisterSuppScreen';
import ProductScreen from '../screens/Suppliers/ProductScreen';
import ShippScreen from '../screens/Suppliers/ShippScreen';
import Four from '../fragments/CreateShipp/Four';
import Provinces from '../fragments/CreateShipp/Provinces';
import { CreateSaleScreen } from '../screens/CreateSaleScreen';
import StripeTest from '../fragments/SaleCreate/StripeTest';

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeScreen}/>

        <Route exact path="/productos/:slug" component={ProductDetailScreen}/>
        <Route exact path="/productos" component={ProductsScreen}/>

        <Route exact path="/puestos" component={SuppliersScreen}/>
        <Route exact path="/puestos/:slug" component={SupplierDetailScreen}/>

        <Route exact path="/acceso-usuarios" component={AuthScreen}/>
        <Route exact path="/activar-usuarios/:token" component={Activate}/>
        <Route exact path="/area-privada-usuarios" component={AreaUsersScreen}/>
        <Route exact path="/tramitar-pedido" component={CreateSaleScreen}/>
        <Route exact path="/text-stripe" component={StripeTest}/>

{/* Suppliers ---------------------------------------------------------------------------------------- */}
        <Route exact path="/area-tiendas" component={HomeSuppScreen} />

        <Route exact path="/acceso-tiendas" component={LoginSuppScreen} />
        <Route exact path="/registro-tiendas" component={RegisterSuppScreen} />

        <Route exact path="/administrador-tiendas" component={AdminSuppScreen} />

        <Route exact path="/envios-tiendas/crear-modelo-envio" component={CreateShippScreen} />
        <Route exact path="/envios-tiendas/crear-modelo-envio/provincias" component={Provinces} />
        <Route exact path="/envios-tiendas/crear-modelo-envio/ccaa" component={Provinces} />
        <Route exact path="/envios-tiendas/crear-modelo-envio/:option" component={Four} />
        <Route exact path="/envios-tiendas" component={ShippScreen} />

        <Route exact path="/productos-tiendas/crear-producto" component={CreateProductScreen} />
        <Route exact path="/productos-tiendas" component={ProductScreen} />

{/* Errores ---------------------------------------------------------------------------------------- */}
        {/* <Route exact path="/404" component={() => <Error code={404} />} />
        <Route exact path="/403" component={() => <Error code={403} />} /> */}

        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default Router
