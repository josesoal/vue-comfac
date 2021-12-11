import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventario from './components/inventario/Inventario'
import Compra from './components/compra/Compra'
import Facturacion from './components/facturacion/Facturacion'

Vue.use(VueRouter)

const routes = [
  { path: '/inventario', component: Inventario},
  { path: '/compra', component: Compra},
  { path: '/facturacion', component: Facturacion},
  { path: '/', redirect: '/inventario'},
]

const router = new VueRouter({
  routes /* short for `routes: routes` */
})

export default router