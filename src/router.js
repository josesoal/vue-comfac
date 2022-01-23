import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventario from './components/inventario/Inventario'
import Compra from './components/compra/Compra'
import Facturacion from './components/facturacion/Facturacion'
import Login from './components/login/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/inventario', name: 'inventario', component: Inventario},
  { path: '/compra', name: 'compra', component: Compra},
  { path: '/facturacion', name: 'facturacion', component: Facturacion},
  { path: '/', name: 'home', redirect: '/inventario'},
  { path: '/login', name: 'login', component: Login},
]

const router = new VueRouter({
  routes /* short for `routes: routes` */
})

router.beforeEach( (to, from, next) => {
  const isLogged = ( localStorage.getItem('access') != null );
  if ( to.name !== 'login' && !isLogged ) {
    next( {name: 'login'} );
  }
  else {
    next();
  }
});

export default router