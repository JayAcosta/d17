import Vue from 'vue'
import Router from 'vue-router'

// Custom.
import Login from '@/components/Login/Login'
import Home from '@/components/Home/Home'
import Registro from '@/components/Registro/Registro'
import ListaArticulos from "@/components/Articulos/ListaArticulos";
import TipoArticulo from "@/components/Articulos/TipoArticulo";
import Precios from "@/components/Precios/Precios";
import ListaMoneda from "@/components/Moneda/ListaMoneda"
import Cliente from "@/components/Cliente/Cliente";
import Proveedor from "@/components/Proveedor/Proveedor";
import CtaCte from "@/components/CtaCte/CtaCte";
// import PageNotFound from "@/components/PageNotFound/PageNotFound";

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/home',
        component: Home
    }, {
        path: '/',
        component: Login
    }, {
        path: '/registro',
        component: Registro
    }, {
        path: '/articulos/lista',
        component: ListaArticulos
    }, {
        path: '/tipo-articulo/add',
        component: TipoArticulo
    }, {
        path: '/precios',
        component: Precios
    }, {
        path: '/moneda',
        component: ListaMoneda
    }, {
        path: '/cliente',
        component: Cliente
    }, {
        path: '/proveedor',
        component: Proveedor
    }, {
        path: '/cuenta-corriente',
        component: CtaCte
    }
  ]
});