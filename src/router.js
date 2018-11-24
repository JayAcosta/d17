import Vue from 'vue';
import Router from 'vue-router';

// Custom.
import Login from '@/components/Login/Login';
import Home from '@/components/Home/Home';
import HomeSeller from '@/components/Home/HomeSeller';
import HomeDebtCollector from "@/components/Home/HomeDebtCollector";
// import TipoArticulo from "@/components/Articulos/TipoArticulo";
// import PageNotFound from "@/components/PageNotFound/PageNotFound";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: Login
        }, {
            path: "/home",
            component: Home
        },{
            path: "/seller",
            component: HomeSeller
        }, {
            path: "/debt-collector",
            component: HomeDebtCollector
        }
  ]
});